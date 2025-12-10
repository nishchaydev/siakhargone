
import type { Metadata } from 'next';
import AdmissionsPageClient from './AdmissionsPageClient';
import data from '@/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Join Sanskar International Academy. Learn about our admissions process, scholarships, and career support.',
};

const careerCounsellingImage = {
  id: 'career-counselling',
  imageUrl: "https://res.cloudinary.com/dkits80xk/image/upload/v1765351972/ptm-1_jfssci.webp",
  description: "Career Counselling Session",
  imageHint: "Counselling"
};

export default function AdmissionsPage() {
  return <AdmissionsPageClient careerCounsellingImage={careerCounsellingImage} />;
}
