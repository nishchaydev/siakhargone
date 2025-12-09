
"use client";

import { useState, useEffect } from 'react';
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Section } from '@/components/common/Section';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "What is the admission process?",
    answer: "The admission process begins with filling out an enquiry form on our website. Our admissions team will then guide you through the next steps, which typically include document submission, a student interaction, and confirmation of admission upon selection."
  },
  {
    question: "What are the school timings?",
    answer: "The school operates from 8:00 AM to 3:00 PM, Monday to Friday. Administrative offices are open from 9:00 AM to 4:00 PM on weekdays."
  },
  {
    question: "What curriculum do you follow?",
    answer: "We follow the CBSE (Central Board of Secondary Education) curriculum, which is enhanced with our own integrated programs for holistic development."
  },
  {
    question: "Do you offer transportation services?",
    answer: "Yes, we offer safe and reliable transportation services covering major routes across the city. Please contact the school office for details on routes and fees."
  }
];

export default function ContactPageClient() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <motion.div
        className="pt-[70px] bg-grain min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section className="py-28 md:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight font-headline">Get in Touch</h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  Have questions about admissions, curriculum, or anything else? We'd love to hear from you.
                </p>
                <div className="mt-8 space-y-6">
                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Our Address</h3>
                      <p className="text-muted-foreground">Gowadi, Khargone - Khandwa Hwy, Fata, Badgaon [Nagjhiri], Khargone, Madhya Pradesh 451001</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Email Us</h3>
                      <p className="text-muted-foreground">info@siakhargone.in</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Call Us</h3>
                      <p className="text-muted-foreground">070491 10104</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.2 }}>
                <Card
                  className="card-premium flex flex-col items-center justify-center text-center p-8 h-full cursor-pointer hover:shadow-2xl"
                  onClick={() => setIsFormOpen(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Open contact form"
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsFormOpen(true)}
                >
                  <MessageSquare className="h-16 w-16 text-primary mb-4" />
                  <h3 className="text-2xl font-bold">Send a Message</h3>
                  <p className="text-muted-foreground mt-2">Click here to open our contact form and send us an inquiry directly.</p>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <Section id="faq" title="Frequently Asked Questions" subtitle="Find quick answers to common questions." bgColor="bg-cream">
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground prose">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

      </motion.div>
      {isMounted && (
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Send a Message</DialogTitle>
              <DialogDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <ContactForm onFormSuccess={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
