"use client";

import { Section } from "@/components/common/Section";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { schoolData } from "@/data/schoolData";

export const PrincipalMessage = () => {
  return (
    <Section id="principal-message" className="bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-navy/5 rounded-bl-full -mr-20 -mt-20 z-0" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-tr-full -ml-10 -mb-10 z-0" />

      <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
            <Image
              src="/school-logo.png"
              alt="Principal of Sanskar International Academy"
              fill
              className="object-cover p-10 bg-navy/5"
            />
          </div>
          {/* Floating Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute -bottom-6 -right-6 md:right-0 bg-navy text-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block"
          >
            <Quote className="h-8 w-8 text-gold mb-2 opacity-80" />
            <p className="text-sm font-medium italic leading-relaxed">
              "{schoolData.principal.messageQuote}"
            </p>
          </motion.div>
        </motion.div>

        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <span className="text-gold font-bold tracking-wider uppercase text-sm">Leadership</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy">
              From the <span className="text-gold-accent">Principal's Desk</span>
            </h2>
          </div>

          <div className="prose prose-lg text-muted-foreground">
            <p>
              Welcome to Sanskar International Academy. As we embark on this journey of learning and discovery, our commitment remains steadfast: to nurture not just successful students, but compassionate human beings.
            </p>
            <p>
              In our classrooms, we don't just teach subjects; we cultivate leaders. We believe in an education that balances academic rigor with creative freedom, ensuring every child finds their unique voice in this world.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-navy hover:bg-navy-light text-white">
              <Link href="/about#principal">Read Full Message</Link>
            </Button>
            <div className="flex flex-col justify-center pl-4 border-l-4 border-gold">
              <span className="font-display font-bold text-navy text-lg">{schoolData.principal.name}</span>
              <span className="text-sm text-muted-foreground">Principal, SIA Khargone</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
