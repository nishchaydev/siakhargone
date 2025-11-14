
// src/components/home/HeroVideo.tsx
'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';

type Props = {
  videoSrc?: string // Keeping for potential future use, but will use Image for now
  poster?: string
  title?: React.ReactNode
  subtitle?: React.ReactNode
  cta?: React.ReactNode
}

export default function HeroVideo({
  poster = 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&w=1600&q=80',
  title = (
    <>
      <h1 className="text-white font-headline text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight drop-shadow-md">Nurturing Values, Igniting Minds — SIA</h1>
    </>
  ),
  subtitle = <p className="text-accent text-4xl md:text-5xl mb-8 drop-shadow-sm" style={{fontFamily: "'Playfair Display', serif"}}>विद्या ददाति विनयंम्</p>,
  cta,
}: Props) {

  return (
    <section className="relative w-full h-[80vh] md:h-screen flex items-center justify-center text-center overflow-hidden bg-gray-900">
      {/* Optimized Image Background */}
      <Image
        src={poster}
        alt="Sanskar International Academy campus"
        fill
        className="object-cover z-0"
        priority // Ensures LCP element is loaded with high priority
        sizes="100vw"
        data-ai-hint="school campus"
      />

      {/* Overlay - z10 */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'rgba(30, 58, 138, 0.6)' }} /* bg-primary/60 */
        aria-hidden="true"
      />

      {/* Content - z20 */}
      <motion.div
        className="relative z-20 px-6 md:px-12 max-w-6xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="text-white drop-shadow-lg">
          <div className="mx-auto">{title}</div>
          <div className="mx-auto mt-4">{subtitle}</div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {cta}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
