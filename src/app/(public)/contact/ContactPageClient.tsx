"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import confetti from "canvas-confetti";
import { schoolData } from "@/data/schoolData";

export default function ContactPageClient() {
  // -------------------------------------------------------------------------
  // 🔴 PASTE YOUR GOOGLE WEB APP URL HERE
  // -------------------------------------------------------------------------
  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [lastSubmission, setLastSubmission] = React.useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // Capture form reference before async operation
    setIsSubmitting(true);

    const formData = new FormData(form);

    // Submission Data matching the Google Apps Script structure
    // Submission Data matching the Google Apps Script structure
    const submissionData = {
      type: "enquiry",
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || "",
      class: formData.get('class') as string, // Extracted for validation
      message: formData.get('message') as string
    };

    // 🔒 Security: Validate input using Zod
    // Import dynamically or ensure schema is client-compatible
    // For simplicity, we import from lib/schemas since it's just pure JS/validation logic
    const { ContactFormSchema } = require("@/lib/schemas");

    const validation = ContactFormSchema.safeParse(submissionData);

    if (!validation.success) {
      const errorMsg = validation.error.issues[0].message;
      alert(`Validation Error: ${errorMsg}`);
      setIsSubmitting(false);
      return;
    }

    // Use internal API route
    try {
      await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });


      // Success Feedback
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      // Reset form
      form.reset();
      setIsSuccess(true);
      setLastSubmission(submissionData); // Store for manual button

      // WhatsApp Redirection Logic
      const whatsappText = `Hi, I am ${submissionData.name}. I want admission information for Class ${submissionData.class || "General"}. Query: ${submissionData.message}`;
      const whatsappUrl = `https://wa.me/917049110104?text=${encodeURIComponent(whatsappText)}`;

      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 2000);

    } catch (error) {
      console.error("Error submitting form", error);
      alert("Something went wrong. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen pb-20">

        {/* Main Content Container */}
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Column: Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-3xl font-display font-medium text-gold-accent">Our Address & Details</h2>

              <div className="bg-white p-2 rounded-3xl shadow-lg border border-gray-100">
                <div className="bg-gray-50 rounded-2xl overflow-hidden relative h-64 w-full mb-6">
                  {/* Map Replacement - Using iframe for functionality but styled like the image */}
                  <iframe
                    src={schoolData.contact.googleMapLink + "&output=embed"}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    className="absolute inset-0 grayscale-[0.2]"
                  ></iframe>
                </div>

                <div className="px-6 pb-6 space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-navy-dark">{schoolData.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{schoolData.contact.address}</p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-white transition-colors">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy uppercase tracking-wider">Phone Number</p>
                        <p className="text-gray-700 font-medium">{schoolData.contact.phone[0]}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-white transition-colors">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy uppercase tracking-wider">Email Address</p>
                        <p className="text-gray-700 font-medium">{schoolData.contact.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-white transition-colors">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy uppercase tracking-wider">Office Hours</p>
                        <p className="text-gray-700 font-medium">Monday - Friday: 8:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review CTA */}
              <div className="bg-gradient-to-r from-navy to-navy-dark p-6 rounded-3xl shadow-lg border border-gold/30 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gold/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-gold/20 transition-all"></div>
                <h3 className="text-xl font-display font-bold mb-2 flex items-center gap-2">
                  <span className="text-gold">★</span> Love SIA?
                </h3>
                <p className="text-white/80 text-sm mb-4">Help other parents find the best school for their children by leaving us a review.</p>
                <a
                  href={schoolData.contact.googleReviewLink || schoolData.contact.googleMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold bg-white text-navy px-4 py-2 rounded-full hover:bg-gold transition-colors"
                >
                  Rate us on Google <ArrowRight size={12} />
                </a>
              </div>
            </motion.div>

            {/* Right Column: Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-3xl font-display font-medium text-gold-accent">Send an Enquiry</h2>

              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gold/20 relative overflow-hidden h-full flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-10 -mt-10" />

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 py-10"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-navy mb-2">Enquiry Sent!</h3>
                      <p className="text-gray-600">Thank you for contacting us. Redirecting you to WhatsApp for faster support...</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <Button
                        onClick={() => {
                          const data = lastSubmission || { name: "", class: "", message: "" };
                          const whatsappText = `Hi, I am ${data.name}. I want admission information for Class ${data.class || "General"}. Query: ${data.message}`;
                          window.open(`https://wa.me/917049110104?text=${encodeURIComponent(whatsappText)}`, '_blank');
                        }}
                        className="mt-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold"
                      >
                        Open WhatsApp Now
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => setIsSuccess(false)}
                        className="mt-2 w-full bg-navy hover:bg-navy-dark text-white font-bold"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy">Full Name</label>
                      <input name="name" type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-accent focus:ring-1 focus:ring-gold-accent outline-none transition-all" required />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy">Phone Number</label>
                      <input name="phone" type="tel" placeholder="+91 000 000 0000" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-accent focus:ring-1 focus:ring-gold-accent outline-none transition-all" required />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy">Email Address</label>
                      <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-accent focus:ring-1 focus:ring-gold-accent outline-none transition-all" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy">Student's Prospective Class</label>
                      <select name="class" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-accent focus:ring-1 focus:ring-gold-accent outline-none transition-all appearance-none cursor-pointer">
                        <option value="">Select a class</option>
                        <option value="nursery">Nursery</option>
                        <option value="kg1">KG 1</option>
                        <option value="kg2">KG 2</option>
                        <option value="1">Class 1</option>
                        <option value="2">Class 2</option>
                        <option value="3">Class 3</option>
                        <option value="4">Class 4</option>
                        <option value="5">Class 5</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-navy">Message</label>
                      <textarea name="message" rows={4} placeholder="Your message..." className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-accent focus:ring-1 focus:ring-gold-accent outline-none transition-all resize-none"></textarea>
                    </div>

                    <Button className="w-full bg-navy hover:bg-navy-light text-white font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg mt-4" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Submit Enquiry"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Visit Our Campus Section */}
        <section className="relative py-24 overflow-hidden mt-12">
          <div className="absolute inset-0 bg-navy-dark z-0">
            <Image src="https://res.cloudinary.com/dkits80xk/image/upload/v1765349456/infrastructure-building-2_zx4im1.webp"
              alt="Campus Background"
              fill
              className="object-cover opacity-20 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/90 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Visit Our Campus</h2>
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                Experience the vibrant atmosphere and state-of-the-art facilities at Sanskar International Academy firsthand. We invite you to schedule a personalized tour to see what makes our school special.
              </p>
              <a href="/tour" className="inline-block">
                <button className="px-8 py-4 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-navy-dark transition-all duration-300 rounded-full font-bold text-lg flex items-center gap-3 group">
                  Schedule a School Tour
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
