"use client";

import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";
import type { Announcement } from "@/lib/definitions";

interface AnnouncementMarqueeProps {
  announcements: Announcement[] | null;
  isLoading: boolean;
}

export function AnnouncementMarquee({ announcements, isLoading }: AnnouncementMarqueeProps) {
  if (isLoading) {
    return (
      <div className="bg-primary text-primary-foreground text-[10px] uppercase tracking-wider py-1 text-center">
        Loading...
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return null;
  }

  // Combine titles with a separator
  const content = announcements.map(a => a.title).join("   ✦   ");

  return (
    <div className="bg-navy-dark text-white text-[10px] md:text-xs uppercase tracking-widest font-medium overflow-hidden whitespace-nowrap border-b border-white/5 relative z-50">
      <motion.div
        className="py-2 inline-block"
        animate={{ x: ["0%", "-50%"] }} // Animate to -50% assuming double content
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 40, // Slower
          ease: "linear",
        }}
      >
        <div className="flex items-center">
          {/* Render content sufficiently enough to loop smoothly */}
          <span className="mx-4 flex items-center gap-2">
            {content}
          </span>
          <span className="mx-4 flex items-center gap-2">
            ✦   {content}
          </span>
          <span className="mx-4 flex items-center gap-2">
            ✦   {content}
          </span>
          <span className="mx-4 flex items-center gap-2">
            ✦   {content}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
