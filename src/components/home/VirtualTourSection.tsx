
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { VideoModal } from "./VideoModal";
import Link from "next/link";
import { cloudinary } from "@/lib/cloudinary-images";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const virtualTourImage = {
  imageUrl: cloudinary.infrastructure.building[0],
  description: "SIA Campus Tour",
  imageHint: "virutal tour thumbnail"
};
const youtubeVideoUrl = "https://www.youtube.com/embed/RlF7vCdM86Q?autoplay=1&mute=1";

export function VirtualTourSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">A Day in the Life of SIA</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Watch our campus reel to get a feel for student life at Sanskar International Academy.
            </p>
          </motion.div>

          {virtualTourImage && (
            <motion.div
              className="relative aspect-video w-full max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden group cursor-pointer"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              onClick={() => setIsVideoModalOpen(true)}
            >
              <Image src={virtualTourImage.imageUrl}
                alt={virtualTourImage.description}
                data-ai-hint={virtualTourImage.imageHint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div
                  className="flex flex-col items-center text-white"
                  aria-label="Play campus reel video"
                >
                  <PlayCircle className="h-24 w-24 text-white/80 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                  <span className="mt-2 text-lg font-semibold tracking-wider uppercase">Play Campus Reel</span>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div className="mt-8 text-center" variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <Button asChild size="lg" className="rounded-xl">
              <Link href="/virtual-tour">
                Experience Our Campus
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={youtubeVideoUrl}
      />
    </>
  );
}
