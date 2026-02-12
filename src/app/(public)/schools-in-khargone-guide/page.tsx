import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cloudinary } from '@/lib/cloudinary-images';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Schools in Khargone Guide | Education Landscape',
    description: 'A comprehensive guide to the educational landscape in Khargone. Understand the difference between CBSE, MP Board, and other schools.',
    keywords: ['Schools in Khargone', 'Education in Khargone', 'CBSE vs MP Board', 'Best schools Khargone guide'],
    alternates: {
        canonical: 'https://siakhargone.in/schools-in-khargone-guide',
    }
};

export default function SchoolsInKhargoneGuide() {
    return (
        <main className="min-h-screen bg-background pt-24 pb-16">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-navy mb-4">Schools in Khargone: A Parent's Guide</h1>
                    <p className="text-muted-foreground text-lg">Understanding the educational landscape in our historic city.</p>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                    <p>
                        Khargone, a city rich in history and culture, is also becoming a hub for quality education in Madhya Pradesh.
                        With numerous options available, ranging from traditional state board schools to modern CBSE institutions,
                        parents often face a challenging decision.
                    </p>

                    <h2 className="text-2xl font-bold text-navy">Types of Schools in Khargone</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>CBSE Schools:</strong> Follow the Central Board of Secondary Education curriculum, focusing on national-level competitive exams like JEE and NEET.</li>
                        <li><strong>MP Board Schools:</strong> Follow the state curriculum, often with a focus on local language and state-specific subjects.</li>
                        <li><strong>International Schools:</strong> Offer global curriculums and often have advanced infrastructure (though rare in smaller districts).</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-navy">The Rise of Holistic Education</h2>
                    <p>
                        In recent years, the definition of a "good school" in Khargone has shifted. It is no longer just about rote learning.
                        Leading institutions like <Link href="/best-cbse-school-in-khargone" className="text-gold font-bold hover:underline">Sanskar International Academy</Link> are
                        pioneering a holistic approach that balances academic rigor with sports, arts, and leadership training.
                    </p>

                    <div className="my-8 rounded-xl overflow-hidden relative h-64 shadow-lg">
                        <Image src={cloudinary.infrastructure.building[0]} alt="Modern School Infrastructure in Khargone" fill className="object-cover" />
                    </div>

                    <h2 className="text-2xl font-bold text-navy">Why Infrastructure Matters</h2>
                    <p>
                        When looking for a school, infrastructure plays a key role. A school with well-equipped science labs,
                        digital libraries, and safe transport facilities provides a superior learning environment.
                        <Link href="/best-cbse-school-in-khargone" className="text-navy font-bold hover:underline"> Explore SIA's world-class facilities</Link> to see
                        what a modern campus looks like.
                    </p>

                    <h2 className="text-2xl font-bold text-navy">Conclusion</h2>
                    <p>
                        Choosing a school is an investment in your child's future. We recommend visiting campuses, talking to teachers,
                        and looking at track records. If you are looking for a school that offers a perfect blend of values and modern education,
                        consider visiting us.
                    </p>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gold/20 text-center">
                    <h3 className="text-2xl font-bold text-navy mb-4">Ready to explore one of Khargone's finest?</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild className="bg-navy text-white hover:bg-gold hover:text-navy">
                            <Link href="/best-cbse-school-in-khargone">Discover SIA Khargone</Link>
                        </Button>
                        <Button asChild variant="outline" className="border-navy text-navy">
                            <Link href="/contact">Schedule a Visit</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
