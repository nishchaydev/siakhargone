
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Globe, Clock } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function LocationSection() {
  const address = "Gowadi, Khargone - Khandwa Hwy, Fata, Badgaon [Nagjhiri], Khargone, Madhya Pradesh 451001";
  const directionsUrl = "https://goo.gl/maps/k4CSy8U8q7m2eKhy5";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.6612052127647!2d75.60170977515855!3d21.82034108005473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3961053259f0d7bb%3A0xe3c27790e7a85b43!2sSanskar%20International%20Academy!5e0!3m2!1sen!2sin!4v1731048922031!5m2!1sen!2sin";

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">Find Us</h2>
              <p className="text-lg text-muted-foreground">
                Visit Sanskar International Academy — conveniently located on Khargone–Khandwa Highway.
              </p>

              <div className="space-y-4">
                 <div className="flex items-start gap-4 text-muted-foreground">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><MapPin className="h-5 w-5 text-primary"/></div>
                    <span>{address}</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Phone className="h-5 w-5 text-primary"/></div>
                    <a href="tel:07049110104" className="hover:text-primary transition-colors">070491 10104</a>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Mail className="h-5 w-5 text-primary"/></div>
                    <a href="mailto:info@siakhargone.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">info@siakhargone.in</a>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Clock className="h-5 w-5 text-primary"/></div>
                    <span>Open till 5 PM</span>
                  </div>
              </div>

            <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto bg-accent text-black hover:bg-accent/90"
            >
              <a 
                href={directionsUrl}
                target="_blank" 
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </Button>
          </div>

           <div className="md:col-span-1">
            <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
              <iframe
                loading="lazy"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                allowFullScreen={true}
                referrerPolicy="no-referrer-when-downgrade"
                src={mapEmbedUrl}
              ></iframe>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
