import type { Metadata } from 'next';
import PageBanner from '@/components/common/PageBanner';
import LeadershipContent from '@/components/about/LeadershipContent';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Student Leadership 2025-26 | Sanskar International Academy',
    description: 'Meet the House Captains and Student Council of Sanskar International Academy Khargone for academic year 2025-26. Building future leaders through student representation.',
    keywords: 'student council, house captains, student leadership, SIA Khargone, CBSE school leadership',
    openGraph: {
        title: 'Student Leadership 2025-26 | Sanskar International Academy',
        description: 'Meet our student leaders - House Captains and Student Council members',
        images: [
            {
                url: 'https://res.cloudinary.com/dkits80xk/image/upload/v1770863355/ea18b716-7de8-4f91-95d7-84dd7e4da118.png',
                width: 1200,
                height: 630,
                alt: 'Student Leadership at SIA Khargone',
            },
        ],
    },
}

// Main Component
export default function StudentLeadershipPage() {
    const bannerImage = "https://res.cloudinary.com/dkits80xk/image/upload/v1770863355/ea18b716-7de8-4f91-95d7-84dd7e4da118.png";

    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="Student Leadership 2025-26"
                subtitle="Nurturing integrity, capability, and the spirit of service in our future leaders."
                image={bannerImage}
            />

            {/* Breadcrumb-like indicator (Subtle) */}
            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-cardBorder text-sm font-medium text-navy/60">
                    <span>About Us</span>
                    <span className="text-gold">/</span>
                    <span className="text-navy">Student Leadership</span>
                </div>
            </div>

            <LeadershipContent bannerImage={bannerImage} />
        </div>
    )
}
