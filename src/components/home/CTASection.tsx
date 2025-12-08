
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";

export function CTASection() {
    return (
        <section className="section-xl relative overflow-hidden bg-navy">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[200%] bg-white rounded-[40%] rotate-12 blur-3xl"></div>
                <div className="absolute top-[20%] -right-[20%] w-[60%] h-[150%] bg-gold rounded-[40%] -rotate-12 blur-3xl"></div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 relative z-10 text-center">
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Ready to Join the SIA Family?
                </motion.h2>

                <motion.p
                    className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Admissions are open for the academic year 2025-26. Give your child the gift of world-class education rooted in values.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Button asChild size="lg" className="w-full sm:w-auto bg-siaOrange hover:bg-orange-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                        <Link href="/admissions">
                            Apply Now
                        </Link>
                    </Button>

                    <Button asChild size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-navy font-semibold text-lg px-8 py-6 rounded-full transition-all">
                        <Link href="/contact">
                            <Calendar className="mr-2 h-5 w-5" /> Schedule a Visit
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
