
import type { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the team at Sanskar International Academy.',
};

export default function CareersPage() {
  return <CareersPageClient />;
}
