import type { Metadata } from 'next';
import { loadMessage, loadCommittee } from '@/lib/content';
import { LeadershipMessage } from '@/components/about/LeadershipMessage';
import { ManagementCommittee } from '@/components/about/ManagementCommittee';

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

    return (
        <div className="bg-grain min-h-screen pt-20">
            {/* Chairman / Director Message */}
            <LeadershipMessage
                messageData={chairmanMessage}
                title="Our Director's Message"
                subtitle="Guiding with purpose and values"
                variant="chairman"
            />

            {/* Committee Table */}
            <ManagementCommittee members={committee?.members || []} />
        </div>
    );
}
