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
      <div className="bg-primary text-primary-foreground text-sm py-2 text-center">
        Loading announcements...
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return null;
  }

  const marqueeContent = announcements.map(a => a.title).join(" | ");

  return (
    <div className="bg-primary text-primary-foreground text-sm overflow-hidden whitespace-nowrap">
      <motion.div
        className="py-2 inline-block"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {/* Render content twice for seamless loop */}
        <span className="mx-8 flex items-center gap-2">
          <Megaphone className="h-4 w-4" /> {marqueeContent}
        </span>
        <span className="mx-8 flex items-center gap-2">
          <Megaphone className="h-4 w-4" /> {marqueeContent}
        </span>
      </motion.div>
    </div>
  );
}
