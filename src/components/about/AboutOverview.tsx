"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Section } from "@/components/common/Section";
import { MotionDiv } from '@/components/common/Motion';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    viewport: { once: true, amount: 0.2 }
};

interface AboutOverviewProps {
    content: string;
    schoolImage?: {
        src: string | null;
        alt: string;
    } | null;
    stats?: {
        students: string;
        teachers: string;
        established: string;
        campusSize: string;
    };
}

export function AboutOverview({ content, schoolImage, stats }: AboutOverviewProps) {
    return (
        <Section id="overview" isFirstSection={true}>
            <div className="grid md:grid-cols-2 gap-12 items-start relative">
                <MotionDiv variants={fadeInUp} className="prose lg:prose-lg max-w-none text-muted-foreground">
                    <p className="intro-text mb-6 font-medium text-navy-dark leading-relaxed">
                        <strong>Sanskar International Academy is one of the leading CBSE English-medium
                            schools in Khargone, known for disciplined academics, modern infrastructure, and
                            holistic student development.</strong> Since our establishment in {stats?.established || '2016'}, we have grown
                        to educate {stats?.students || '1100+'} students with a dedicated team of {stats?.teachers || '50+'} qualified teachers. Located
                        on Khandwa Road, our {stats?.campusSize || '4-acre'} campus features state-of-the-art facilities including
                        computer labs, science laboratories, library, sports complex, and GPS-enabled
                        transport covering 15+ routes across Khargone district.
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: content }} />

                    <div className="mt-8 mb-8">
                        <h3 className="text-xl font-display font-bold text-navy mb-4 border-l-4 border-gold pl-3">Quick Facts (Digital Fact Sheet)</h3>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <caption className="sr-only">School Quick Facts</caption>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-3 px-4 font-semibold text-navy w-1/3">Entity Name</th>
                                        <td className="py-3 px-4 text-slate-600">Sanskar International Academy (SIA)</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-3 px-4 font-semibold text-navy">Affiliation</th>
                                        <td className="py-3 px-4 text-slate-600">CBSE, New Delhi (Affiliation No. 1031345)</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-3 px-4 font-semibold text-navy">School Code</th>
                                        <td className="py-3 px-4 text-slate-600">51362</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-3 px-4 font-semibold text-navy">Establishment</th>
                                        <td className="py-3 px-4 text-slate-600">2016</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-3 px-4 font-semibold text-navy">Principal</th>
                                        <td className="py-3 px-4 text-slate-600">Mr. Shivam Jaiswal</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-3 px-4 font-semibold text-navy">Campus Area</th>
                                        <td className="py-3 px-4 text-slate-600">4.0 Acres (Approx)</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-3 px-4 font-semibold text-navy">Location</th>
                                        <td className="py-3 px-4 text-slate-600">Gowadi Fata, Khargone - Khandwa Highway, Badgaon, Khargone, MP - 451001</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <th className="py-3 px-4 font-semibold text-navy">Contact</th>
                                        <td className="py-3 px-4 text-slate-600">+91 70491 10104, siakhargone@gmail.com</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-amber-50 border-l-4 border-gold rounded-r-lg">
                        <p className="text-navy font-medium">
                            Looking for the top-rated education in the city? <a href="/best-school-in-khargone" className="text-royal-blue underline hover:text-gold transition-colors">See why SIA is rated the Best School in Khargone.</a>
                        </p>
                    </div>
                </MotionDiv>
                <MotionDiv variants={fadeInUp} className="sticky top-24">
                    {schoolImage?.src && (
                        <Image src={schoolImage.src}
                            alt={schoolImage.alt}
                            width={600} height={400}
                            className="rounded-full aspect-square shadow-lg w-full object-cover border-4 border-white dark:border-gray-800"
                            priority />
                    )}
                </MotionDiv>
            </div>
        </Section>
    );
}
