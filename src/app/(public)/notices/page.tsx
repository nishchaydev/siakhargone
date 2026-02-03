import type { Metadata } from 'next';
import { NoticeBoard } from '@/components/notices/NoticeBoard';
import PageBanner from '@/components/common/PageBanner';

export const metadata: Metadata = {
    title: 'Notice Board | SIA Khargone',
    description: 'Stay updated with the latest circulars, notices, and announcements from Sanskar International Academy.',
};

export default function NoticesPage() {
    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="Notice Board"
                subtitle="Latest updates, circulars, and announcements for students and parents."
                image="https://images.unsplash.com/photo-1577896335477-1647ed9bca2c?q=80&w=2070&auto=format&fit=crop"
            />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <NoticeBoard />
                </div>
            </div>
        </div>
    );
}
