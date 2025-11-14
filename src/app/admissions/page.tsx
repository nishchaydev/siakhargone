
import type { Metadata } from 'next';
import AdmissionsPageClient from './AdmissionsPageClient';
import data from '@/lib/placeholder-images.json';

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Join Sanskar International Academy. Learn about our admissions process, scholarships, and career support.',
};

const careerCounsellingImage = data.placeholderImages.find(img => img.id === 'career-counselling');

export default function AdmissionsPage() {
  return <AdmissionsPageClient careerCounsellingImage={careerCounsellingImage} />;
}
