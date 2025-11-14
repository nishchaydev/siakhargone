
"use server";

import { z } from "zod";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { initializeFirebase } from "@/firebase";
import { FirestorePermissionError, errorEmitter } from "@/firebase";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type ContactFormState = {
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  };
  isSuccess?: boolean;
};

export async function handleContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
      isSuccess: false,
    };
  }

  try {
    const { firestore } = initializeFirebase();
    const submissionsCollection = collection(firestore, "contactFormSubmissions");
    
    const submissionData = {
      ...validatedFields.data,
      query: validatedFields.data.message, // Map message to query to match schema
      submissionDate: serverTimestamp(),
    };

    // Non-blocking write
    addDoc(submissionsCollection, submissionData).catch(serverError => {
       // Emit the error to the global handler instead of throwing
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: submissionsCollection.path,
        operation: 'create',
        requestResourceData: submissionData,
      }));
    });

    return {
      message: "Thank you for your message! We will get back to you shortly.",
      isSuccess: true,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      message: "An unexpected error occurred. Please try again later.",
      isSuccess: false,
    };
  }
}
