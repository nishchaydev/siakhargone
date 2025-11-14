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
          <Button asChild size="lg">
            <Link href="/admissions">Enquire Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 hover:text-white">
            <Link href="/virtual-tour">Virtual Tour</Link>
          </Button>
        </>
      }
    />
  )
}
