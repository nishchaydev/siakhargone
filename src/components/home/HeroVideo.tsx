
// src/components/home/HeroVideo.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';

type Props = {
  videoSrc?: string
  poster?: string
  title?: React.ReactNode
  subtitle?: React.ReactNode
  cta?: React.ReactNode
}

export default function HeroVideo({
  poster = 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&w=1600&q=80',
  title, // We will use internal defaults if not provided, or render children
  subtitle,
  cta,
}: Props) {

  return (
    <section className="relative w-full h-[85vh] md:h-screen flex items-center overflow-hidden bg-gray-900 py-32">
      {/* Optimized Image Background */}
      <Image src={poster}
        alt="Sanskar International Academy campus"
        fill
        className="object-cover z-0"
        priority
        sizes="100vw"
        data-ai-hint="school campus" />

      {/* New Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-[#0F1E34]/80 to-[#1A3C73]/30"
        aria-hidden="true"
      />

      {/* Content Container - Left Aligned */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
        <motion.div
          className="max-w-4xl text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="text-white drop-shadow-lg">
            {/* Heading */}
            <h1 className="text-white font-headline text-5xl md:text-[60px] lg:text-[70px] leading-[1.1] mb-6 drop-shadow-lg">
              Nurturing Values,<br className="hidden md:block" /> Igniting Minds — SIA
            </h1>

            {/* Subtitle Block */}
            <div className="mb-10">
              <p className="text-gray-200 text-xl md:text-2xl mb-3 font-sans font-light tracking-wide">
                Where education meets excellence
              </p>
              <div className="inline-block relative">
                <p className="text-accent text-3xl md:text-5xl font-headline pb-1">
                  विद्या ददाति विनयंम्
                </p>
                <div className="w-full h-0.5 bg-accent/60 absolute bottom-0 left-0"></div>
              </div>
            </div>

            {/* Buttons - Left Aligned */}
            <div className="flex flex-col sm:flex-row gap-5 justify-start">
              {cta}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
