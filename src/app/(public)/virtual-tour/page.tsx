import type { Metadata } from 'next';
import VirtualTourPageClient from './VirtualTourPageClient';
import Schema from '@/components/seo/Schema';

export const metadata: Metadata = {
  title: 'Virtual Campus Tour - Explore SIA Khargone | 360° Interactive Tour',
  description: 'Take a virtual tour of Sanskar International Academy. Explore our 5-acre campus, smart classrooms, science labs, sports facilities, and modern infrastructure from anywhere.',
  keywords: ['virtual tour SIA', 'campus tour khargone', 'school virtual tour', '360 campus tour', 'SIA facilities'],
  openGraph: {
    title: 'Virtual Campus Tour | Sanskar International Academy',
    description: 'Explore our world-class campus facilities through an interactive virtual tour',
    images: [
      {
        url: 'https://res.cloudinary.com/dkits80xk/image/upload/v1765377520/Gemini_Generated_Image_q9u4r1q9u4r1q9u4_ukwf8a.png',
        width: 1200,
        height: 630,
        alt: 'SIA Campus Virtual Tour'
      }
    ]
  },
  alternates: {
    canonical: 'https://siakhargone.in/virtual-tour',
  },
};

// VideoObject schema data for campus tour video
const campusTourVideo = {
  name: 'Sanskar International Academy - Campus Tour',
  description: 'Take a virtual tour of our 5-acre campus featuring smart classrooms, science labs, sports facilities, library, and modern infrastructure.',
  thumbnailUrl: 'https://img.youtube.com/vi/RlF7vCdM86Q/maxresdefault.jpg',
  uploadDate: '2024-01-15T00:00:00Z',
  duration: 'PT3M45S', // 3 minutes 45 seconds - adjust as needed
  contentUrl: 'https://www.youtube.com/watch?v=RlF7vCdM86Q',
  embedUrl: 'https://www.youtube.com/embed/RlF7vCdM86Q'
};

export default function VirtualTourPage() {
  return (
    <>
      <Schema type="VideoObject" data={campusTourVideo} />
      <VirtualTourPageClient />
    </>
  );
}
