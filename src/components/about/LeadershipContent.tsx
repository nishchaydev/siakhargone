"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Users,
    Trophy,
    ShieldCheck,
    Crown,
    Palette,
    HeartHandshake,
    Anchor,
    Sparkles
} from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    viewport: { once: true, amount: 0.1 }
};

interface LeadershipContentProps {
    bannerImage: string;
    studentCouncilImage?: string;
}

export default function LeadershipContent({
    bannerImage,
    studentCouncilImage = "https://res.cloudinary.com/dkits80xk/image/upload/v1770863349/9690af22-e610-4828-a6f6-14eaf7e5c4dd.png"
}: LeadershipContentProps) {
    return (
        <div className="container mx-auto px-4 py-16 space-y-32 max-w-7xl">
            {/* Introduction Section - Premium Glass Card */}
            <motion.section {...fadeInUp}>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-cardBorder p-8 md:p-14 relative overflow-hidden group">
                    {/* Decorative element */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors duration-700" />
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gold" />

                    <div className="relative z-10 grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-1">
                            <h2 className="text-3xl md:text-5xl font-bold text-navy font-display leading-[1.1]">
                                Building <br />
                                <span className="text-gold italic">Leaders</span> <br />
                                of Character
                            </h2>
                            <div className="w-12 h-1 bg-gold mt-6" />
                        </div>
                        <div className="lg:col-span-2">
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                                At Sanskar International Academy, student leadership is a journey of responsibility and service.
                                Our student leaders represent the collective voice of their peers, upholding the academy's
                                legacy of excellence while fostering a community built on empathy and ethical governance.
                            </p>
                            <p className="text-gray-500 mt-6 leading-relaxed">
                                The House System and Student Council provide a foundation for students to refine their
                                strategic thinking, teamwork, and commitment to collective well-being.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* House Captains Section - Balanced Layout */}
            <section id="house-captains" className="relative">
                <motion.div
                    className="grid lg:grid-cols-12 gap-16 items-center"
                    {...fadeInUp}
                >
                    <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold-dark font-bold text-xs tracking-[0.2em] uppercase">
                            <Anchor className="w-3 h-3" />
                            The House System
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-navy font-display leading-tight">
                            House Captains & <br />Vice Captains
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed border-l-2 border-gold/30 pl-6 italic">
                            Our legacy lives through Aravalli, Himalaya, Satpura, and Vindyachal. Led by visionaries
                            who inspire their teams across academic, athletic, and creative arenas.
                        </p>
                    </div>
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <div className="relative rounded-[2.5rem] p-4 bg-white shadow-2xl border border-cardBorder">
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group">
                                <Image
                                    src={bannerImage}
                                    alt="House Captains 2025-26 - Sanskar International Academy"
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                    priority
                                    quality={85}
                                />
                                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-700" />

                                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border-l-4 border-gold group-hover:-translate-y-2 transition-transform duration-500">
                                    <span className="block text-2xl font-bold text-navy font-display leading-none">2025-26</span>
                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-gold-dark mt-1">Academic Cohort</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Student Council Section - Mirror Layout */}
            <section id="student-council">
                <motion.div
                    className="grid lg:grid-cols-12 gap-16 items-center"
                    {...fadeInUp}
                >
                    <div className="lg:col-span-7 order-1">
                        <div className="relative rounded-[2.5rem] p-4 bg-white shadow-2xl border border-cardBorder">
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group">
                                <Image
                                    src={studentCouncilImage}
                                    alt="Student Council 2025-26 - Sanskar International Academy"
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-out"
                                    quality={85}
                                />
                                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-700" />

                                <div className="absolute top-6 right-6 bg-navy/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border-r-4 border-gold group-hover:-translate-y-2 transition-transform duration-500">
                                    <span className="block text-xl font-bold text-white font-display leading-none text-right">Apex Body</span>
                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-gold mt-1 text-right">Student Governance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 space-y-8 order-2 lg:order-2">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-navy/5 border border-navy/10 text-navy font-bold text-xs tracking-[0.2em] uppercase">
                            <Sparkles className="w-3 h-3" />
                            Apex Governance
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-navy font-display leading-tight">
                            Student <br />Council
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed border-r-2 border-navy/30 pr-6 text-right font-medium">
                            The Student Council acts as a strategic bridge between the scholars and the academy
                            leadership, driving initiatives that champion student welfare and cultural vibrancy.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Leadership Roles - Modern Grid */}
            <section className="pb-32">
                <motion.div
                    className="text-center mb-20 space-y-4"
                    {...fadeInUp}
                >
                    <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs">Avenues for Impact</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-navy font-display">Leadership Roles</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Executive Council",
                            desc: "Head Boy & Head Girl: The apex representatives of the student body, guiding the council of secretaries.",
                            icon: Crown,
                            accent: "gold"
                        },
                        {
                            title: "House Stewardship",
                            desc: "Captains and Vice Captains driving inter-house excellence in academics and community spirit.",
                            icon: Users,
                            accent: "navy"
                        },
                        {
                            title: "Discipline & Decorum",
                            desc: "Secretaries working to uphold the highest standards of conduct and academy traditions.",
                            icon: ShieldCheck,
                            accent: "gold"
                        },
                        {
                            title: "Athletic Coordination",
                            desc: "Managing sports meets and fostering sportsmanship across all age groups and houses.",
                            icon: Trophy,
                            accent: "navy"
                        },
                        {
                            title: "Cultural Enrichment",
                            desc: "Orchestrating celebrations and school festivals that showcase the artistic soul of SIA.",
                            icon: Palette,
                            accent: "gold"
                        },
                        {
                            title: "Scholastic Welfare",
                            desc: "Bridging peer needs with faculty support to enhance the academy's learning environment.",
                            icon: HeartHandshake,
                            accent: "navy"
                        }
                    ].map((role, index) => (
                        <motion.div
                            key={role.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white p-10 rounded-[2rem] shadow-soft border border-cardBorder hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden"
                        >
                            {/* Subtle Hover Background Effect */}
                            <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 ${role.accent === 'gold' ? 'bg-gold' : 'bg-navy'}`} />

                            <div className={`text-4xl mb-8 w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-500 bg-gray-50 group-hover:rotate-[10deg] ${role.accent === 'gold' ? 'group-hover:bg-gold/10 text-gold-dark' : 'group-hover:bg-navy/10 text-navy'}`}>
                                <role.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-navy mb-4 font-display group-hover:text-gold-dark transition-colors">{role.title}</h3>
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-900">
                                {role.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
