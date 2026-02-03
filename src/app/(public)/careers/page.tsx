import CareersPageClient from "./CareersPageClient";
import type { Metadata } from 'next';
import { getCareersService } from "@/services/careersService";

export const metadata: Metadata = {
  title: 'Careers | Work with SIA',
  description: 'Join the team at Sanskar International Academy. Explore current job openings for teachers and staff. Apply online today.',
};

export const dynamic = 'force-dynamic';

export default async function CareersPage() {
  const careers = await getCareersService().catch(() => []);
  return <CareersPageClient initialCareers={careers} />;
}
