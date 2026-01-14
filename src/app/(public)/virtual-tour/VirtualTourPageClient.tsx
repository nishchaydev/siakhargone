"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Video, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

const YOUTUBE_ID = "RlF7vCdM86Q"; // Official Tour
const MATTERPORT_DEMO_URL = "https://my.matterport.com/show/?m=JGPnGQ6wM5l"; // Placeholder/Demo

export default function VirtualTourPageClient() {
  const [mode, setMode] = useState<"video" | "360">("video");

  return (
    <div className="pt-[70px] bg-grain min-h-screen">
      <Section
        id="tour"
        title="Campus Virtual Tour"
        subtitle="Explore our campus and facilities via our guided video or interactive 360° walkthrough."
        isFirstSection={true}
      >
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={mode === "video" ? "default" : "outline"}
            onClick={() => setMode("video")}
            className="gap-2"
          >
            <Video className="w-4 h-4" /> Guided Video
          </Button>
          <Button
            variant={mode === "360" ? "default" : "outline"}
            onClick={() => setMode("360")}
            className="gap-2"
          >
            <Globe className="w-4 h-4" /> 360° Walkthrough
          </Button>
        </div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mx-auto"
        >
          {mode === "video" ? (
            <div className="relative aspect-video w-full rounded-xl shadow-2xl overflow-hidden border-4 border-navy/10">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="w-full h-full absolute top-0 left-0"
              ></iframe>
            </div>
          ) : (
            <div className="relative w-full rounded-xl shadow-2xl overflow-hidden border-4 border-navy/10 bg-gray-900">
              <div className="aspect-video w-full">
                {/* Replace src with your actual Matterport/Kuula/Google Street View Embed URL */}
                <iframe
                  width="100%"
                  height="100%"
                  src={MATTERPORT_DEMO_URL} // User will replace this
                  frameBorder="0"
                  allowFullScreen
                  allow="xr-spatial-tracking"
                  className="w-full h-full"
                ></iframe>
              </div>
              <Card className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 text-white border-0 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-gold" />
                  <div>
                    <h4 className="font-bold text-gold">Interactive 360° View</h4>
                    <p className="text-xs text-white/70">
                      This is a demo view. School administration needs to provide the official Matterport/Kuula link.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </Section>
    </div>
  );
}
