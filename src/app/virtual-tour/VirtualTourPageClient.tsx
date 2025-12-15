
"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/common/Section";

const youtubeVideoUrl = "https://www.youtube.com/embed/RlF7vCdM86Q?autoplay=1&mute=1";

export default function VirtualTourPageClient() {
  return (
    <div className="pt-[70px] bg-grain min-h-screen">
      <Section
        id="tour"
        title="Campus Virtual Tour"
        subtitle="Explore our campus and facilities through our official video tour."
        isFirstSection={true}
      >
        <motion.div
          className="relative aspect-video w-full max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <iframe
            width="100%"
            height="100%"
            src={youtubeVideoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="w-full h-full absolute top-0 left-0"
          ></iframe>
        </motion.div>
      </Section>
    </div>
  );
}
