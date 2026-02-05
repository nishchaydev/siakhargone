"use client";

import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

const pressMentions = [
    { name: "Dainik Bhaskar", label: "Featured for Academic Excellence" },
    { name: "Patrika", label: "Best School Infrastructure Award" },
    { name: "Naidunia", label: "Top CBSE Result 2024" },
    { name: "Khargone Times", label: "Holistic Development Feature" },
];

export function PressLogos() {
    return (
        <section className="py-12 bg-slate-50 border-t border-gray-100">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
                    Recognized by Leading Media
                </p>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale hover:grayscale-0 transition-all duration-500">
                    {pressMentions.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center gap-2 group cursor-default"
                        >
                            <div className="flex items-center gap-2 text-2xl font-display font-bold text-navy-dark group-hover:text-gold transition-colors">
                                <Newspaper className="w-6 h-6" />
                                <span>{item.name}</span>
                            </div>
                            <span className="text-xs uppercase tracking-wide text-slate-400 group-hover:text-slate-600 transition-colors">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
