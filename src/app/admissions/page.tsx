
import type { Metadata } from 'next';
import AdmissionsPageClient from './AdmissionsPageClient';
// import data from '@/lib/placeholder-images.json'; // Removed mock data dependency

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Join Sanskar International Academy. Learn about our admissions process, scholarships, and career support.',
};

const careerCounsellingImage = {
  id: 'career-counselling',
  imageUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800",
  description: "Career Counselling",
  imageHint: "counselling session"
};

import { fetchStrapi, getStrapiMedia } from '@/lib/strapi';

export default async function AdmissionsPage() {
  const [feeRes, committeeRes] = await Promise.all([
    fetchStrapi("fee-structure", "populate=deep,10"), // Assuming fee-structure collection/single exists
    fetchStrapi("school-managing-committees", "populate=deep,10")
  ]);

  const feeData = feeRes?.data?.attributes;
  const committeeData = committeeRes?.data?.[0]?.attributes;

  const pdfLinks = {
    feeStructure: getStrapiMedia(feeData?.pdfFile?.data?.attributes?.url) || "#",
    committee: getStrapiMedia(committeeData?.file?.data?.attributes?.url) || "#",
  };

  return <AdmissionsPageClient careerCounsellingImage={careerCounsellingImage} pdfLinks={pdfLinks} />;
}
