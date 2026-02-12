import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cloudinary } from '@/lib/cloudinary-images';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'CBSE Admission in Khargone | Process & Requirements',
    description: 'Everything you need to know about securing a CBSE school admission in Khargone. Age limits, documents, and selection criteria.',
    keywords: ['CBSE Admission Khargone', 'School Admission Process', 'SIA Admission', 'Nursery Admission Khargone'],
    alternates: {
        canonical: 'https://siakhargone.in/cbse-admission-in-khargone',
    }
};

export default function CbseAdmissionGuide() {
    return (
        <main className="min-h-screen bg-background pt-24 pb-16">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-navy mb-4">CBSE School Admission in Khargone: A 2026 Guide</h1>
                    <p className="text-muted-foreground text-lg">Detailed steps to secure your child&apos;s seat in a top institution.</p>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
                    <p>
                        Admissions for the 2026-27 academic session are opening soon across Khargone.
                        For parents seeking quality CBSE education, understanding the process early is crucial to avoid last-minute stress.
                    </p>

                    <h2 className="text-2xl font-bold text-navy">1. The Typical Timeline</h2>
                    <p>
                        Most premier schools in Khargone, including <Link href="/best-cbse-school-in-khargone" className="text-gold font-bold hover:underline">Sanskar International Academy (SIA)</Link>,
                        start their admission process between December and March. Seats for entry-level classes (Nursery/KG) fill up the fastest.
                    </p>

                    <h2 className="text-2xl font-bold text-navy">2. Documentation Checklist</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Birth Certificate:</strong> Essential for age verification.</li>
                        <li><strong>Aadhar Card:</strong> For both student and parents.</li>
                        <li><strong>Previous Report Cards:</strong> For admissions in Class 1 and above.</li>
                        <li><strong>Transfer Certificate (TC):</strong> Mandatory when switching schools.</li>
                        <li><strong>Passport Size Photos:</strong> Recent photographs of the child.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-navy">3. Age Criteria (As per NEP 2020)</h2>
                    <p>
                        The New Education Policy (NEP) has standardized age criteria. Generally, a child should be
                        3+ years for Nursery and 6+ years for Class 1 by the start of the academic year.
                    </p>

                    <div className="my-8 p-6 bg-navy/5 border-l-4 border-gold rounded-r-xl">
                        <strong className="block text-navy text-lg mb-2">Pro Tip:</strong>
                        <p className="m-0">Always visit the school website for the specific age calculator. Check <Link href="/admissions" className="text-gold font-bold hover:underline">SIA&apos;s Admission Page</Link> for precise details.</p>
                    </div>

                    <h2 className="text-2xl font-bold text-navy">4. Assessment & Interaction</h2>
                    <p>
                        For higher classes, schools often conduct a basic proficiency test in English, Math, and Science to understand
                        the student&apos;s current level. For Nursery/KG, there is usually a casual interaction with the parents and child,
                        focusing on readiness rather than academic knowledge.
                    </p>

                    <h2 className="text-2xl font-bold text-navy">Why Choose CBSE?</h2>
                    <p>
                        The Central Board is known for its standardized curriculum that prepares students excellently for
                        national entrance exams like JEE, NEET, and CLAT. If you have transferrable jobs or aspire for
                        national-level colleges, CBSE is the preferred choice.
                    </p>
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gold/20 text-center">
                    <h3 className="text-2xl font-bold text-navy mb-4">Secure your seat at Khargone&apos;s leading CBSE school</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button asChild className="bg-navy text-white hover:bg-gold hover:text-navy">
                            <Link href="/admissions">Apply Online at SIA</Link>
                        </Button>
                        <Button asChild variant="outline" className="border-navy text-navy">
                            <Link href="/best-cbse-school-in-khargone">Why SIA is the Best Choice</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
