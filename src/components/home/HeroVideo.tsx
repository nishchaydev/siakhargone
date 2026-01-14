
// src/components/home/HeroVideo.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { schoolData } from '@/data/schoolData'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type HeroVariant = 'modern' | 'classic'

type Props = {
  variant?: HeroVariant
  // Allow overriding image if needed, otherwise default
  backgroundImage?: string
}

export default function HeroVideo({
  variant = 'modern',
  backgroundImage = 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&w=1600&q=80',
}: Props) {

  const { name, cta } = schoolData

  // School Approved Messaging
  const headline = "Empowering Future Leaders"
  const subline = "A legacy of excellence in education, character, and innovation."

  return (
    <section className="relative w-full h-[85vh] flex items-center overflow-hidden bg-gray-900">

      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={`${name} Campus`}
        fill
        className="object-cover z-0"
        priority
        sizes="100vw"
      />

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
