import type { Metadata } from 'next';
import { loadMessage } from '@/lib/content';
import { LeadershipMessage } from '@/components/about/LeadershipMessage';

export const metadata: Metadata = {
    title: 'Principal\'s Message | SIA Khargone',
    description: 'A message from the Principal of Sanskar International Academy.',
};

export default async function PrincipalPage() {
    const principalMsg = await loadMessage("principal-message");

    const principalMessage = principalMsg ? {
        name: principalMsg.name,
        role: principalMsg.role,
        message: principalMsg.message,
        image: principalMsg.image
    } : null;

    return (
        <div className="bg-grain min-h-screen pt-20">
            <LeadershipMessage
                messageData={principalMessage}
                variant="principal"
            />
        </div>
    );
}
