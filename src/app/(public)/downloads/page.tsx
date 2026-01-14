import type { Metadata } from 'next';
import { DownloadsList } from '@/components/downloads/DownloadsList';
import PageBanner from '@/components/common/PageBanner';
import { Section } from '@/components/common/Section';

export const metadata: Metadata = {
    title: 'Downloads & Resources | SIA Khargone',
    description: 'Access important school documents, academic calendars, syllabus, and forms for Sanskar International Academy.',
};

export default function DownloadsPage() {
    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="Downloads & Resources"
                subtitle="Quick access to academic documents, administrative forms, and latest circulars."
                image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="container mx-auto px-4 py-12">
                <DownloadsList />
            </div>
        </div>
    );
}
