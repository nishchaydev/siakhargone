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
        <div className="inline-block px-4">
          <span className="text-gold-accent font-bold">✨ Admissions Open 2026–27:</span> Secure your child's future today! |
          <span className="text-white font-bold ml-4">🚌 Gujarat Educational Tour 2026:</span> Preparing for an epic journey! |
          <span className="text-gold-accent font-bold ml-4">🏆 Congratulations SIA Champions:</span> Victory at District Taekwondo!
        </div>
        <div className="inline-block px-4">
          <span className="text-gold-accent font-bold">✨ Admissions Open 2026–27:</span> Secure your child's future today! |
          <span className="text-white font-bold ml-4">🚌 Gujarat Educational Tour 2026:</span> Preparing for an epic journey! |
          <span className="text-gold-accent font-bold ml-4">🏆 Congratulations SIA Champions:</span> Victory at District Taekwondo!
        </div>
      </motion.div>
    </div>
  );
}
