
import CareersPageClient from "./CareersPageClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Work with SIA',
  description: 'Join the team at Sanskar International Academy. Explore current job openings for teachers and staff. Apply online today.',
};

export default function CareersPage() {
  return <CareersPageClient />;
}
