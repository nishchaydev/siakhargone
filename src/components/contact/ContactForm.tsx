
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleContactForm } from "@/lib/actions";
import type { ContactFormState } from "@/lib/actions";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { schoolData } from "@/data/schoolData";

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
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showManualButton, setShowManualButton] = useState(false);

  useEffect(() => {
    if (state.message) {
      if (!state.isSuccess) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      } else {
        setIsRedirecting(true);
        trackEvent('form_submission', { form: 'contact_enquiry' });
        toast({
          title: "Success! Redirecting...",
          description: "Thanks! Taking you to WhatsApp for faster assistance...",
          duration: 3000,
        });

        // 1. Capture values BEFORE reset
        // We can't rely on formRef.current if we just reset it, 
        // OR we should have captured these on submission. 
        // But since this is a server action result, the form might still be intact until we reset it.
        // Let's grab them safely.
        const form = formRef.current;
        const submittedName = (form?.elements.namedItem('name') as HTMLInputElement)?.value || "Parent";
        const submittedMessage = (form?.elements.namedItem('message') as HTMLTextAreaElement)?.value || "";

        // 2. Reset form
        formRef.current?.reset();
        onFormSuccess?.();

        // 3. Construct URL
        let text = `Hi, I am ${submittedName}. I want admission information.`;
        if (submittedMessage) {
          text += ` Query: ${submittedMessage}`;
        }

        const whatsappUrl = `https://wa.me/${schoolData.contact.whatsapp}?text=${encodeURIComponent(text)}`;

        // 4. Redirect
        setTimeout(() => {
          window.location.href = whatsappUrl;
          setShowManualButton(true);
        }, 1500);
      }
    }
  }, [state, toast, onFormSuccess]);

  if (isRedirecting) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-green-50 rounded-lg border border-green-100">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-green-800">Enquiry Sent!</h3>
        <p className="text-center text-green-700 text-sm">Redirecting to WhatsApp...</p>

        {showManualButton && (
          <a
            href={`https://wa.me/${schoolData.contact.whatsapp}?text=Hi, I want admission information.`}
            onClick={() => trackEvent('whatsapp_click', { location: 'form_fallback' })}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-lg text-center flex items-center justify-center gap-2 transition-transform hover:scale-105"
          >
            Open WhatsApp Manually
          </a>
        )}
      </div>
    )
  }

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
        <Input id="name" name="name" placeholder="Ramesh Kumar" required />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-destructive">{state.errors.name.join(", ")}</p>
        )}
      </motion.div>

      {/* Hidden Email Field - kept for schema validation/spam bots, optional */}
      <motion.div variants={itemVariants} className="hidden">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="ramesh@example.com" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          pattern="[0-9]*"
          inputMode="numeric"
          placeholder="98765 43210"
          required
          className="text-lg tracking-wide"
        />
        {state.errors?.phone && (
          <p className="mt-1 text-xs text-destructive">{state.errors.phone.join(", ")}</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        <Label htmlFor="message">Your Question (Optional)</Label>
        <Textarea id="message" name="message" placeholder="Ask about admissions, fees, or anything else..." />
      </motion.div>

      <motion.div variants={itemVariants}>
        <SubmitButton />
      </motion.div>
    </motion.form>
  );
}
