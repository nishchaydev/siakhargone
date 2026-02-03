
import React from 'react';
import { Metadata } from 'next';
import TestimonialsClient from './TestimonialsClient';

export const metadata: Metadata = {
  title: 'Voices of Our Community - Testimonials',
  description: 'Discover the experiences that shape our academy through the feedback from our parents, alumni, special guests, and students.',
};

export default function TestimonialsPage() {
  return (
    <main className="bg-light-grey min-h-screen font-body text-gray-800">

      {/* Hero Section */}
      <section className="bg-royal-blue text-white py-20 md:py-32 text-center relative overflow-hidden">
        {/* Background pattern or subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-royal-blue to-navy-dark" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

        <div className="relative z-10 container mx-auto px-6">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Voices of Our Community</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Discover the experiences that shape our academy. We deeply value the feedback from our valued community members and distinguished guests.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <TestimonialsClient />
        </div>
      </section>

    </main>
  );
}
