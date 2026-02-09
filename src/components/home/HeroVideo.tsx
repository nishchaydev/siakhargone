
// src/components/home/HeroVideo.tsx
'use client'

import React from 'react'
import { schoolData } from '@/data/schoolData'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

import heroBg from '@/assets/images/hero-bg.jpg'

type HeroVariant = 'modern' | 'classic'

type Props = {
  variant?: HeroVariant
  // Allow overriding image if needed, otherwise default
  backgroundImage?: any // Changed to any to accept StaticImageData
  videoId?: string
  fallbackVideoUrl?: string
}

export default function HeroVideo({
  variant = 'modern',
  backgroundImage = heroBg,
  videoId = '5ObfN8wX0Jg',
  fallbackVideoUrl = "https://res.cloudinary.com/dkits80xk/video/upload/v1770285411/Republic_Day_2026_Sanskar_International_Academy_-_Sanskar_International_Academy_Khargone_Official_720p_h264_cnliwr.mp4"
}: Props) {

  const { name, cta } = schoolData

  // School Approved Messaging
  const headline = "Empowering Future Leaders"
  const subline = "A legacy of excellence in education, character, and innovation."

  return (
    <section className="relative w-full h-[85vh] flex items-center overflow-hidden bg-gray-900">

      {/* LCP Optimization: High priority background image loading behind the video */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Hero Background"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>

      {/* Background Video */}
      {(() => {
        // Explicit validation and extraction
        const getYoutubeId = (url: string) => {
          const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
          const match = url.match(regExp);
          return (match && match[2].length === 11) ? match[2] : "";
        };

        const resolvedVideoId = (videoId.includes('.') || videoId.includes('/')) ? getYoutubeId(videoId) : (videoId.match(/^[A-Za-z0-9_-]{11}$/) ? videoId : "");

        const SKIP_INTRO_SECONDS = 3; // skip 3s intro/logo frame to show content immediately

        if (resolvedVideoId) {
          return (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <div className="relative w-full h-full min-w-[177.77vh] min-h-[56.25vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <iframe
                  className="absolute top-0 left-0 w-full h-full border-0"
                  src={`https://www.youtube.com/embed/${resolvedVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${resolvedVideoId}&playsinline=1&rel=0`}
                  title="Hero Background Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }

        return (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            poster={backgroundImage}
            onLoadedMetadata={(e) => { e.currentTarget.currentTime = SKIP_INTRO_SECONDS; }}
          >
            <source src={fallbackVideoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      })()}
      {/* Overlay - Changes based on variant */}
      <div
        className={cn(
          "absolute inset-0 z-10 pointer-events-none",
          variant === 'modern'
            ? "bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent"
            : "bg-black/50"
        )}
      />

      {/* Content Container */}
      <div className={cn(
        "relative z-20 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center",
        variant === 'classic' ? "items-center text-center" : "items-start text-left"
      )}>

        <div className="max-w-4xl space-y-6">
          {/* Badge / Small text */}
          <span className={cn(
            "inline-block py-1 px-3 rounded-full text-sm font-medium tracking-wide uppercase",
            variant === 'modern' ? "bg-blue-600/90 text-white" : "bg-white/20 text-white backdrop-blur-sm"
          )}>
            Admissions Open {schoolData.academicYear}
          </span>

          {/* Headline */}
          <h1 className="text-white font-bold text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-lg">
            {headline}
          </h1>

          {/* Supporting Line */}
          <p className="text-gray-200 text-lg md:text-2xl font-light max-w-2xl drop-shadow-md mx-auto lg:mx-0">
            {subline}
          </p>

          {/* CTA */}
          <div className={cn(
            "pt-4 flex flex-col sm:flex-row gap-4",
            variant === 'classic' ? "justify-center" : "justify-start"
          )}>
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto shadow-xl bg-blue-600 hover:bg-blue-700 text-white rounded-full">
              <Link href={cta.admissions.link}>{cta.admissions.text}</Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2 border-white/60 text-white hover:bg-white hover:text-black rounded-full bg-transparent">
              <Link href={cta.enquiry.link}>{cta.enquiry.text}</Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
