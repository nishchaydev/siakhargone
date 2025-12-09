"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { Job } from "@/lib/definitions";

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

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsLoading(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log("Application submitted (Mock):", data);

      toast({
        title: "Application Submitted!",
        description: "Thank you for applying. We will be in touch shortly.",
      });
      reset();
      onSuccess();

    } catch (error) {
      console.error("Application submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
