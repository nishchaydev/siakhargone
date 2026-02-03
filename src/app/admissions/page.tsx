import type { Metadata } from 'next';
import AdmissionsPageClient from './AdmissionsPageClient';
import { loadCommittee, loadDownloads } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Admissions',
  description: 'Join Sanskar International Academy. Learn about our admissions process, scholarships, and career support.',
};

export const dynamic = "force-static";


export default async function AdmissionsPage() {
  const { documents: committeeDocs } = await loadCommittee();
  const downloads = loadDownloads();

  // Try to find fee structure in downloads or committee docs fallback
  const feeDoc = downloads.find(d => d.title.toLowerCase().includes('fee')) ||
    committeeDocs.find((d: any) => d.title.toLowerCase().includes('fee'));

  const committeeDoc = committeeDocs.length > 0 ? committeeDocs[0] : null;

  const pdfLinks = {
    feeStructure: feeDoc ? feeDoc.fileUrl : "#",
    committee: committeeDoc ? committeeDoc.fileUrl : "#",

  };

  const careerCounsellingImage = {
    id: 'career-counselling',
    imageUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800",
    description: "Career Counselling",
    imageHint: "counselling session"
  };

  return <AdmissionsPageClient careerCounsellingImage={careerCounsellingImage} pdfLinks={pdfLinks} />;
}
