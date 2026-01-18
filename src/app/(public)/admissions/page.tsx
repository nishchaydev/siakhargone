
import type { Metadata } from 'next';
import AdmissionsPageClient from './AdmissionsPageClient';
import data from '@/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Admissions Open 2026-27 - Apply Online',
  description: 'Secure your child\'s future at Sanskar International Academy. View admission process, eligibility, and scholarship details. Apply online today.',
};

const careerCounsellingImage = {
  id: 'career-counselling',
  imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1765351972/ptm-1_jfssci.webp",
  description: "Career Counselling Session",
  imageHint: "Counselling"
};

import { getSiteAssets } from '@/lib/cms-fetch';

export const dynamic = 'force-dynamic';

export default async function AdmissionsPage() {
  const assets = await getSiteAssets().catch(() => []);
  const bannerImage = assets.find(a => a.key === 'banner_admissions')?.imageUrl;

  return <AdmissionsPageClient careerCounsellingImage={careerCounsellingImage} bannerImage={bannerImage} />;
}
