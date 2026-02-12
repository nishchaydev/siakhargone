import type { Metadata } from 'next';
import Image from 'next/image';
import { loadMessage, loadCommittee } from '@/lib/content';
import { LeadershipMessage } from '@/components/about/LeadershipMessage';
import { ManagementCommittee } from '@/components/about/ManagementCommittee';
import { Section } from '@/components/common/Section';
import PageBanner from '@/components/common/PageBanner';

export const metadata: Metadata = {
    title: 'Management & Committee | SIA Khargone',
    description: 'Meet the visionary leadership and managing committee of Sanskar International Academy.',
};

export default async function ManagementPage() {
    const [directorMsg, committee] = await Promise.all([
        loadMessage("director-message"),
        loadCommittee()
    ]);

    const chairmanMessage = directorMsg ? {
        name: directorMsg.name,
        role: directorMsg.role,
        message: directorMsg.message,
        image: directorMsg.image
    } : null;

    const bannerImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop";

    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="Management & Committee"
                subtitle="Visionary leadership dedicated to academic excellence and character building."
                image={bannerImage}
            />

            <div className="pb-20">
                {/* Chairman / Director Message */}
                <LeadershipMessage
                    messageData={chairmanMessage}
                    title="Our Director's Message"
                    subtitle="Guiding with purpose and values"
                    variant="chairman"
                />

                {/* Committee Table */}
                <ManagementCommittee members={committee?.members || []} />

                {/* Teaching Team Section */}
                <Section
                    id="teaching-team"
                    title="Our Teaching Team"
                    subtitle="Qualified, passionate, and dedicated educators."
                >
                    <div className="bg-white rounded-2xl shadow-soft border border-cardBorder overflow-hidden">
                        <div className="p-6 md:p-10">
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-4xl">
                                Our 50+ qualified and experienced teachers are the backbone of Sanskar International
                                Academy. Each brings unique expertise and passion to create an engaging learning
                                environment for our 1100+ students.
                            </p>

                            <div className="relative w-full rounded-xl overflow-hidden shadow-lg group">
                                <Image
                                    src="https://res.cloudinary.com/dkits80xk/image/upload/v1770862707/7230c484-46a1-4f9b-afb6-a9f0a9dd6f18.png"
                                    alt="Teaching faculty and staff members of Sanskar International Academy Khargone"
                                    width={1200}
                                    height={600}
                                    className="w-full h-auto transform group-hover:scale-[1.01] transition-transform duration-700"
                                    quality={100}
                                    priority={false}
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
}
