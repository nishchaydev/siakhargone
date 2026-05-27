"use client";

import { motion } from "framer-motion";
import { useAccessibleAnimation } from "@/hooks/use-accessible-animation";
import { MonitorPlay, Cpu, Wifi, BrainCircuit } from "lucide-react";
import Image from "next/image";

const features = [
    {
        icon: MonitorPlay,
        title: "Smart Classrooms",
        description: "Every classroom is equipped with Interactive Flat Panels (IFPs) for immersive visual learning.",
    },
    {
        icon: Cpu,
        title: "Modern Computer Lab",
        description: "1:1 Student-Computer ratio with high-speed internet and latest software curriculum.",
    },
    {
        icon: BrainCircuit,
        title: "AI-Integrated Learning",
        description: "Future-ready curriculum introducing students to Artificial Intelligence and Robotics from an early age.",
    },
    {
        icon: Wifi,
        title: "Campus-Wide Wi-Fi",
        description: "Seamless connectivity for digital research and online assessments.",
    }
];

export function DigitalCampus() {
    const { safeInitial, safeTransition } = useAccessibleAnimation();

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-navy/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={safeInitial({ opacity: 0, y: 16 })}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={safeTransition({ duration: 0.4 })}
                        className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold-dark text-sm font-bold mb-4 border border-gold/20"
                    >
                        Future Ready Education
                    </motion.div>
                    <motion.h2
                        initial={safeInitial({ opacity: 0, y: 16 })}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={safeTransition({ delay: 0.08, duration: 0.4 })}
                        className="text-4xl md:text-5xl font-display font-bold text-navy mb-4"
                    >
                        The <span className="text-gold-accent">Digital Campus</span>
                    </motion.h2>
                    <motion.p
                        initial={safeInitial({ opacity: 0, y: 16 })}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={safeTransition({ delay: 0.15, duration: 0.4 })}
                        className="text-lg text-gray-600"
                    >
                        We don't just teach technology; we live it. SIA Khargone offers a fully integrated digital ecosystem to prepare your child for the 21st century.
                    </motion.p>
                </div>

                {/* Fixed: unified brand colors instead of mixed blue/purple/rose/emerald
                   per design-taste §4.2 Color Consistency Lock */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={safeInitial({ opacity: 0, y: 20 })}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={safeTransition({ delay: index * 0.08 + 0.2, duration: 0.4 })}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-[transform,box-shadow] duration-200 border border-gray-100 group hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-navy/5 flex items-center justify-center mb-6 group-hover:bg-gold/10 group-hover:scale-110 transition-transform duration-200">
                                <feature.icon className="w-7 h-7 text-navy group-hover:text-gold-dark transition-colors duration-200" />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors duration-200">
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
                    initial={safeInitial({ opacity: 0, y: 24 })}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={safeTransition({ delay: 0.3, duration: 0.5 })}
                    className="mt-16 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative aspect-[21/9] md:aspect-[21/7]"
                >
                    <Image
                        src="https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto/v1765349465/lab-computer-1_sfxfjx.webp"
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
