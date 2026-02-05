
import type { Metadata } from 'next';
import AdmissionsPageClient from './AdmissionsPageClient';


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

export default async function AdmissionsPage() {
  return <AdmissionsPageClient careerCounsellingImage={careerCounsellingImage} />;
}
