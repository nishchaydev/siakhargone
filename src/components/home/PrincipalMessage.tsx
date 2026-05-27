"use client";

import { Section } from "@/components/common/Section";
import Image from "next/image";
// import schoolLogo from "@/assets/school-logo.png";
const schoolLogo = "https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto,w_200/v1768373239/school-logo_npmwwm.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useAccessibleAnimation } from "@/hooks/use-accessible-animation";
import { schoolData } from "@/data/schoolData";

export const PrincipalMessage = () => {
  const { safeInitial, safeTransition } = useAccessibleAnimation();
  return (
    <Section id="principal-message" className="bg-white relative overflow-hidden py-12 md:py-16">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-navy/5 rounded-bl-full -mr-20 -mt-20 z-0" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-tr-full -ml-10 -mb-10 z-0" />

      <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Image Side */}
        <motion.div
          initial={safeInitial({ opacity: 0, x: -30 })}
          whileInView={{ opacity: 1, x: 0 }}
          transition={safeTransition({ duration: 0.5, ease: [0.23, 1, 0.32, 1] })}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
            <Image
              src={schoolLogo}
              alt="Sanskar International Academy logo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-contain p-10 bg-navy/5"
            />
          </div>
          {/* Floating Quote Card */}
          <motion.div
            initial={safeInitial({ opacity: 0, y: 20 })}
            whileInView={{ opacity: 1, y: 0 }}
            transition={safeTransition({ delay: 0.2, duration: 0.4 })}
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
          initial={safeInitial({ opacity: 0, x: 30 })}
          whileInView={{ opacity: 1, x: 0 }}
          transition={safeTransition({ duration: 0.5, ease: [0.23, 1, 0.32, 1] })}
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
            <Button asChild variant="secondary" size="lg">
              <Link href="/about#principal">Read Full Message</Link>
            </Button>
            <div className="flex flex-col justify-center pl-4 bg-gold/5 rounded-lg px-4 py-2">
              <span className="font-display font-bold text-navy text-lg">{schoolData.principal.name}</span>
              <span className="text-sm text-muted-foreground">{schoolData.principal.title || "Principal, SIA Khargone"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
