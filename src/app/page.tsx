
"use client";

import { fallbackHighlights, fallbackTestimonials, fallbackPrincipalMessage, fallbackChairmanMessage } from "@/data/fallbackData";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { PrincipalMessage } from "@/components/home/PrincipalMessage";
import { ChairmanMessage } from "@/components/home/ChairmanMessage";
import { Academics } from "@/components/home/Academics";
import { Highlights } from "@/components/home/Highlights";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { GallerySection } from "@/components/home/GallerySection";
import { VirtualTourSection } from "@/components/home/VirtualTourSection";
import dynamic from 'next/dynamic';

import { Stats } from "@/components/home/Stats";
// const Stats = dynamic(() => import('@/components/home/Stats').then(mod => mod.Stats));
import { Testimonials } from "@/components/home/Testimonials";
import { LocationSection } from "@/components/home/LocationSection";


export default function Home() {
  const principalMessage = fallbackPrincipalMessage[0];
  const chairmanMessage = fallbackChairmanMessage[0];
  const displayHighlights = fallbackHighlights;
  const displayTestimonials = fallbackTestimonials;

  return (
    <>
      <HeroSection />
      <AboutSection />
      <PrincipalMessage principalMessage={principalMessage} />
      <ChairmanMessage chairmanMessage={chairmanMessage} />
      <Academics />
      <Highlights highlights={displayHighlights} isLoading={false} />
      <AchievementsSection />
      <GallerySection />
      <VirtualTourSection />
      <Stats />
      <Testimonials testimonials={displayTestimonials} isLoading={false} />
      <LocationSection />
    </>
  );
}
