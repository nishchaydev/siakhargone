import type { Metadata } from 'next';
import { VisionMission } from '@/components/about/VisionMission';

export const metadata: Metadata = {
    title: 'Vision & Mission | SIA Khargone',
    description: 'Our vision to shape future citizens and our mission to provide holistic education at Sanskar International Academy.',
};

export default function VisionPage() {
    return (
        <div className="bg-grain min-h-screen pt-20">
            <VisionMission />
        </div>
    );
}
