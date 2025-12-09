'use client'
import React from 'react'
import HeroVideo from './HeroVideo'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <HeroVideo
      cta={
        <>
          <Button asChild size="lg" className="text-lg px-8 py-6 h-auto shadow-xl hover:translate-y-[-2px] transition-all">
            <Link href="/admissions">Enquire Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2 border-white/80 bg-white/5 text-white hover:bg-white hover:text-royalBlue transition-all">
            <Link href="/virtual-tour">Virtual Tour</Link>
          </Button>
        </>
      }
    />
  )
}
