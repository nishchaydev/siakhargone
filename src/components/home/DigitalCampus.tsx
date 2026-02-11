"use client";

import { motion } from "framer-motion";
import { MonitorPlay, Cpu, Wifi, BrainCircuit } from "lucide-react";
import Image from "next/image";

const features = [
    {
        icon: MonitorPlay,
        title: "Smart Classrooms",
        description: "Every classroom is equipped with Interactive Flat Panels (IFPs) for immersive visual learning.",
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        icon: Cpu,
        title: "Modern Computer Lab",
        description: "1:1 Student-Computer ratio with high-speed internet and latest software curriculum.",
        color: "text-purple-500",
        bg: "bg-purple-50"
    },
    {
        icon: BrainCircuit,
        title: "AI-Integrated Learning",
        description: "Future-ready curriculum introducing students to Artificial Intelligence and Robotics from an early age.",
        color: "text-rose-500",
        bg: "bg-rose-50"
    },
    {
        icon: Wifi,
        title: "Campus-Wide Wi-Fi",
        description: "Seamless connectivity for digital research and online assessments.",
        color: "text-emerald-500",
        bg: "bg-emerald-50"
    }
];

export function DigitalCampus() {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold-dark text-sm font-bold mb-4 border border-gold/20"
                    >
                        Future Ready Education
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold text-navy mb-4"
                    >
                        The <span className="text-gold-accent">Digital Campus</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600"
                    >
                        We don't just teach technology; we live it. SIA Khargone offers a fully integrated digital ecosystem to prepare your child for the 21st century.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 group hover:-translate-y-1"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className={`w-7 h-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-blue-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Visual Proof Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative aspect-[21/9] md:aspect-[21/7]"
                >
                    <Image
                        src="https://res.cloudinary.com/dkits80xk/image/upload/v1765349465/lab-computer-1_sfxfjx.webp"
                        alt="Students using modern computers at SIA Khargone"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent flex items-center">
                        <div className="p-8 md:p-12 max-w-lg">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Code. Create. Innovate.</h3>
                            <p className="text-white/90 mb-6">
                                From basic computing to advanced coding logic, our students are tech-literate from day one.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
