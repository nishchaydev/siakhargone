
'use client';

// This hook is intended for client-side components that need real-time data.
// For page-level data, prefer using `getCollection` on the server in a React Server Component.

import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  Query,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
export type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useCollection hook.
 * @template T Type of the document data.
 */
export interface UseCollectionResult<T> {
  data: WithId<T>[] | null;
  isLoading: boolean;
  error: FirestoreError | Error | null;
}

/**
 * React hook to subscribe to a Firestore collection or query in real-time.
 *
 * @template T The expected type of the documents in the collection.
 * @param {string | Query | null} target The path to the Firestore collection or a Firestore Query object.
 * @returns {UseCollectionResult<T>} An object containing the data, loading state, and any error.
 */
export function useCollection<T>(
  target: string | Query | null
): UseCollectionResult<T> {
  const firestore = useFirestore();
  const [data, setData] = useState<WithId<T>[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  useEffect(() => {
    // Wait for firestore to be initialized
    if (!firestore) {
      setIsLoading(true);
      return;
    }

    if (!target) {
      setIsLoading(false);
      setData(null);
      return;
    }

    const collectionRef = typeof target === 'string' ? collection(firestore, target) : target;
    const collectionPath = typeof target === 'string' ? target : (collectionRef as Query).path;
    
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        if (!snapshot.empty) {
            const results = snapshot.docs.map(doc => ({ ...(doc.data() as T), id: doc.id }));
            setData(results);
        } else {
            setData([]); // Set to empty array if collection is empty
        }
        setError(null);
        setIsLoading(false);
      },
      (err: FirestoreError) => {
        const contextualError = new FirestorePermissionError({
          operation: 'list',
          path: collectionPath,
        });

        setError(contextualError);
        setData(null); // Set data to null on error
        setIsLoading(false);
        
        // Propagate the error globally
        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [target, firestore]); 

  return { data, isLoading, error };
}
