
import GalleryPageClient from './GalleryPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gallery',
    description: 'Explore moments of learning, creativity, and joy at SIA Khargone.',
};

export default function GalleryPage() {
  return (
    <GalleryPageClient />
  );
}
