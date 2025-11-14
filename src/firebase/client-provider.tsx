
'use client';

import React, { useState, useEffect, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

interface FirebaseServices {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
  storage: FirebaseStorage | null;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [firebaseServices, setFirebaseServices] = useState<FirebaseServices>({
    firebaseApp: null,
    auth: null,
    firestore: null,
    storage: null,
  });

  useEffect(() => {
    // This effect runs only on the client, after the component mounts.
    if (typeof window !== "undefined" && !firebaseServices.firebaseApp) {
      const services = initializeFirebase();
      setFirebaseServices(services);
    }
  }, [firebaseServices.firebaseApp]);

  // Render children immediately and let Firebase initialize in the background.
  // The useFirebase hook will throw an error if its services are accessed before
  // they are available, and individual components can show their own loading states.
  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
      storage={firebaseServices.storage}
    >
      {children}
    </FirebaseProvider>
  );
}
