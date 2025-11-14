
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleContactForm } from "@/lib/actions";
import type { ContactFormState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ContactFormProps {
  onFormSuccess?: () => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Send Message
    </Button>
  );
}

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ContactForm({ onFormSuccess }: ContactFormProps) {
  const initialState: ContactFormState = { message: "", isSuccess: false };
  const [state, formAction] = useFormState(handleContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (!state.isSuccess) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: state.message,
        });
        formRef.current?.reset();
        onFormSuccess?.();
      }
    }
  }, [state, toast, onFormSuccess]);

  return (
    <motion.form 
      ref={formRef} 
      action={formAction} 
      className="space-y-4"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" placeholder="John Doe" required />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-destructive">{state.errors.name.join(", ")}</p>
        )}
      </motion.div>
      <motion.div variants={itemVariants}>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="john@example.com" required />
        {state.errors?.email && (
          <p className="mt-1 text-xs text-destructive">{state.errors.email.join(", ")}</p>
        )}
      </motion.div>
      <motion.div variants={itemVariants}>
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" />
        {state.errors?.phone && (
          <p className="mt-1 text-xs text-destructive">{state.errors.phone.join(", ")}</p>
        )}
      </motion.div>
      <motion.div variants={itemVariants}>
        <Label htmlFor="message">Your Message</Label>
        <Textarea id="message" name="message" placeholder="Please type your question or inquiry here..." required />
        {state.errors?.message && (
          <p className="mt-1 text-xs text-destructive">{state.errors.message.join(", ")}</p>
        )}
      </motion.div>
      <motion.div variants={itemVariants}>
        <SubmitButton />
      </motion.div>
    </motion.form>
  );
}
