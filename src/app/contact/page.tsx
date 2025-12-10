
import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import data from '@/lib/placeholder-images.json';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach out to Sanskar International Academy, Khargone. Visit, call, or email us today.',
};

// const heroImage = "/siakhargone-content/Album/Photo For Uploads/Infrastructure Photos/Building Photos/building photos (2).webp";
const heroImage = { imageUrl: "/siakhargone-content/Album/Photo For Uploads/Infrastructure Photos/Building Photos/building photos (2).webp", description: "School Building", imageHint: "school building" };

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-64 w-full pt-[70px]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
          <h1 className="text-4xl font-bold md:text-5xl font-headline">Contact Us</h1>
          <p className="mt-2 max-w-2xl text-lg">We're here to help. Reach out to us anytime.</p>
        </div>
      </section>
      <ContactPageClient />
    </>
  );
}
