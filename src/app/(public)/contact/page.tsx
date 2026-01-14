
import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import { cloudinary } from '@/lib/cloudinary-images';
import data from '@/lib/placeholder-images.json';
import Image from 'next/image';
import PageBanner from '@/components/common/PageBanner';

export const metadata: Metadata = {
  title: 'Contact Us - Admissions & Enquiry',
  description: 'Get in touch with Sanskar International Academy. Visit our campus in Khargone, call us for admissions, or drop an email query.',
};

// const heroImage = "https://res.cloudinary.com/dkits80xk/image/upload/v1765349456/infrastructure-building-2_zx4im1.webp";
const heroImage = { imageUrl: cloudinary.infrastructure.building[1], description: "School Building", imageHint: "school building" };

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <PageBanner
        title="Contact Us"
        subtitle="We're here to help. Reach out to us anytime."
        image={typeof heroImage === 'string' ? heroImage : heroImage.imageUrl}
      />
      <ContactPageClient />
    </>
  );
}
