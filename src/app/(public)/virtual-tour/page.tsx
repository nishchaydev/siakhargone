
import type { Metadata } from 'next';
import VirtualTourPageClient from './VirtualTourPageClient';

export const metadata: Metadata = {
  title: 'Virtual Tour',
  description: 'Take an interactive tour of the Sanskar International Academy campus.',
};

export default function VirtualTourPage() {
  return <VirtualTourPageClient />;
}
