"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFirestore, useStorage } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { Job } from "@/lib/definitions";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const applicationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  resume: z.any().refine(files => files?.length > 0, "Resume is required"),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  job: Job;
  onSuccess: () => void;
}

export function ApplicationForm({ job, onSuccess }: ApplicationFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const storage = useStorage();
  
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    if (!firestore || !storage) {
        toast({
            title: "Error",
            description: "Services are not ready. Please try again in a moment.",
            variant: "destructive",
        });
        return;
    }
    setIsLoading(true);
    try {
      // 1. Upload resume to Firebase Storage
      const resumeFile = data.resume[0];
      const storageRef = ref(storage, `resumes/${job.id}/${Date.now()}_${resumeFile.name}`);
      const uploadResult = await uploadBytes(storageRef, resumeFile);
      const resumeUrl = await getDownloadURL(uploadResult.ref);

      const applicationData = {
        jobId: job.id,
        jobTitle: job.title,
        name: data.name,
        email: data.email,
        phone: data.phone,
        resumeUrl,
        status: "Submitted",
        submittedAt: serverTimestamp(),
      };
      
      // 2. Save application to Firestore
      const applicationsCollection = collection(firestore, "applications");
      addDoc(applicationsCollection, applicationData)
        .then(() => {
          toast({
            title: "Application Submitted!",
            description: "Thank you for applying. We will be in touch shortly.",
          });
          reset();
          onSuccess();
        })
        .catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: applicationsCollection.path,
                operation: 'create',
                requestResourceData: applicationData,
            });
            errorEmitter.emit('permission-error', permissionError);
        });

    } catch (error) {
      console.error("Application submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong during file upload. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" {...register("phone")} />
        {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="resume">Resume (PDF)</Label>
        <Input id="resume" type="file" accept=".pdf" {...register("resume")} />
        {errors.resume && <p className="text-destructive text-sm">{typeof errors.resume.message === 'string' && errors.resume.message}</p>}
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit Application
      </Button>
    </form>
  );
}
