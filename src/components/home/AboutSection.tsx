
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  viewport: { once: true, amount: 0.3 }
};

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="initial"
          whileInView="whileInView"
          variants={fadeInUp}
        >
          <div className="rounded-xl shadow-lg overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/p/AF1QipPL_YnIfsCr8SR3s-btHLm7dxt-cXXqRILbumEw=s1360-w1360-h1020-rw"
              alt="Sanskar International Academy Campus"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              data-ai-hint="school campus"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">
              About Sanskar International Academy
            </h2>
            <p className="text-lg text-muted-foreground">
             Established with a dream to provide world-class education rooted in Indian values, Sanskar International Academy has grown into a nurturing space where young minds discover purpose, confidence, and compassion.
            </p>
            <p className="text-muted-foreground">
              Our approach blends academics with experiential learning — combining classroom rigor with creativity, sportsmanship, and moral education. We aim to cultivate not just toppers, but thinkers and leaders guided by empathy and ethics.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link href="/about">
                Discover More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

    