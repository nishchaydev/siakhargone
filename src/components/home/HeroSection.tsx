'use client'
import React from 'react'
import HeroVideo from './HeroVideo'

// You can change 'modern' to 'classic' here to switch variants

export function HeroSection({ data, stats }: { data?: any, stats?: any }) {
  // Use the first grid image as the background if available
  const heroImage = data?.grid?.[0];

  return (
    <HeroVideo variant="modern" backgroundImage={heroImage} />
  )
}
