import type { Metadata } from 'next';
import Link from 'next/link';
import PageBanner from '@/components/common/PageBanner';
import LeadershipContent from '@/components/about/LeadershipContent';

const ACADEMIC_YEAR = '2025-26';
const STUDENT_LEADERSHIP_IMAGE_URL = 'https://res.cloudinary.com/dkits80xk/image/upload/v1770863355/ea18b716-7de8-4f91-95d7-84dd7e4da118.png';

// SEO Metadata
export const metadata: Metadata = {
    title: `Student Leadership ${ACADEMIC_YEAR} | Sanskar International Academy`,
    description: `Meet the House Captains and Student Council of Sanskar International Academy Khargone for academic year ${ACADEMIC_YEAR}. Building future leaders through student representation.`,
    keywords: 'student council, house captains, student leadership, SIA Khargone, CBSE school leadership',
    openGraph: {
        title: `Student Leadership ${ACADEMIC_YEAR} | Sanskar International Academy`,
        description: 'Meet our student leaders - House Captains and Student Council members',
        images: [
            {
                url: STUDENT_LEADERSHIP_IMAGE_URL,
                width: 1200,
                height: 630,
                alt: 'Student Leadership at SIA Khargone',
            },
        ],
    },
}

// Main Component
export default function StudentLeadershipPage() {
    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title={`Student Leadership ${ACADEMIC_YEAR}`}
                subtitle="Nurturing integrity, capability, and the spirit of service in our future leaders."
                image={STUDENT_LEADERSHIP_IMAGE_URL}
            />

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="container mx-auto px-4 -mt-8 relative z-20">
                <ol className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-cardBorder text-sm font-medium text-navy/60">
                    <li>
                        <Link href="/" className="hover:text-navy transition-colors">Home</Link>
                    </li>
                    <li className="text-gold" aria-hidden="true">/</li>
                    <li>
                        <Link href="/about/overview" className="hover:text-navy transition-colors">About Us</Link>
                    </li>
                    <li className="text-gold" aria-hidden="true">/</li>
                    <li className="text-navy" aria-current="page">Student Leadership</li>
                </ol>
            </nav>

            <LeadershipContent bannerImage={STUDENT_LEADERSHIP_IMAGE_URL} />
        </div>
    )
}
