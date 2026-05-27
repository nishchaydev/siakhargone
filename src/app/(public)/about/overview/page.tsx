import type { Metadata } from 'next';
import { loadAboutData } from '@/lib/content';
import { AboutOverview } from '@/components/about/AboutOverview';
import PageBanner from '@/components/common/PageBanner';
import AdministrationNotice from '@/components/layout/AdministrationNotice';
import { cloudinary } from '@/lib/cloudinary-images';

export const metadata: Metadata = {
    title: 'About Us - Overview | SIA Khargone',
    description: 'Learn about Sanskar International Academy (SIA), a premier CBSE institution in Khargone combining academic excellence with cultural values.',
    alternates: {
        canonical: 'https://siakhargone.in/about/overview',
    },
    openGraph: {
        title: 'About Us | Sanskar International Academy',
        description: 'Discover the legacy and vision of SIA Khargone. Providing holistic excellence since 2016.',
        url: 'https://siakhargone.in/about/overview',
    }
};

export const revalidate = 3600;

export default async function AboutOverviewPage() {
    const aboutData = await loadAboutData();
    // Use actual campus building photo
    const bannerImage = cloudinary.infrastructure.building[0];

    const schoolImage = (aboutData && aboutData.schoolImage) ? {
        src: aboutData.schoolImage.src,
        alt: aboutData.schoolImage.alt || "School Image"
    } : null;

    return (
        <div className="bg-grain min-h-screen">
            <AdministrationNotice />
            <PageBanner
                title="About Sanskar International Academy"
                subtitle="Nurturing Excellence, Character, and Innovation since 2016."
                image={bannerImage}
            />
            <AboutOverview
                content={aboutData?.content || ""}
                schoolImage={schoolImage}
            />
        </div>
    );
}
