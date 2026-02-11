"use client";

import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";
import type { Announcement } from "@/lib/definitions";

interface AnnouncementMarqueeProps {
  announcements: Announcement[] | null;
  isLoading: boolean;
}

export function AnnouncementMarquee({ announcements, isLoading }: AnnouncementMarqueeProps) {
  // Static content per user request
  // Marquee animation variants
  const marqueeVariants = {
    animate: {
      x: ["100%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, // Adjust speed here (seconds)
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="bg-navy-dark text-white text-xs md:text-sm uppercase tracking-widest font-medium py-2 overflow-hidden relative z-10">
      {/* Gradient Overlays for Smooth Fade Effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-navy-dark to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-navy-dark to-transparent pointer-events-none" />

      <motion.div
        className="whitespace-nowrap flex items-center w-full"
        variants={marqueeVariants}
        animate="animate"
      >
        <a href="/admissions" className="inline-block px-4 hover:text-gold transition-colors">
          Shaping Minds. Building Futures. | <span className="text-gold-accent font-bold">Admissions Open 2026–27</span>
        </a>
        {/* Duplicate for seamless loop if needed, though simple x translate works well for single lines. 
             For a true continuous loop without gaps, we normally duplicate the content multiple times.
             Let's duplicate it once to ensure it fills screen if wide.
          */}
        <a href="/admissions" className="inline-block px-4 hover:text-gold transition-colors">
          Shaping Minds. Building Futures. | <span className="text-gold-accent font-bold">Admissions Open 2026–27</span>
        </a>
        <a href="/admissions" className="inline-block px-4 hover:text-gold transition-colors">
          Shaping Minds. Building Futures. | <span className="text-gold-accent font-bold">Admissions Open 2026–27</span>
        </a>
      </motion.div>
    </div>
  );
}
