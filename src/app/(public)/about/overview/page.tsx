import type { Metadata } from 'next';
import { loadAboutData } from '@/lib/content';
import { AboutOverview } from '@/components/about/AboutOverview';
import PageBanner from '@/components/common/PageBanner';

export const metadata: Metadata = {
    title: 'About Us - Overview | SIA Khargone',
    description: 'Learn about Sanskar International Academy (SIA), a premier CBSE institution in Khargone combining academic excellence with cultural values.',
};

export default async function AboutOverviewPage() {
    const aboutData = await loadAboutData();

    const schoolImage = (aboutData && aboutData.schoolImage) ? {
        src: aboutData.schoolImage.src,
        alt: aboutData.schoolImage.alt || "School Image"
    } : null;

    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="About Sanskar International Academy"
                subtitle="Nurturing Excellence, Character, and Innovation since 2004."
                image="https://images.unsplash.com/photo-1541339907198-e031e787bf77?q=80&w=2070&auto=format&fit=crop"
            />
            <AboutOverview
                content={aboutData?.content || ""}
                schoolImage={schoolImage}
            />
        </div>
    );
}
