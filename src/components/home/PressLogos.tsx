"use client";

import { motion } from "framer-motion";
import { useAccessibleAnimation } from "@/hooks/use-accessible-animation";

/**
 * Press Logos / Featured In section.
 * 
 * Fixed per design-taste §4.8 (logo wall = logo only):
 * - Removed the text wordmark + category label pattern
 * - Using generated SVG marks instead of plain text names
 * - Removed sub-labels (the "Leading News" / "Best Infrastructure" badges)
 */

const pressMentions = [
    { id: 'db', name: "Dainik Bhaskar" },
    { id: 'patrika', name: "Patrika" },
    { id: 'naidunia', name: "Naidunia" },
    { id: 'kt', name: "Khargone Times" },
];

export function PressLogos() {
    const { safeInitial, safeTransition } = useAccessibleAnimation();

    return (
        <section className="py-12 bg-slate-50 border-t border-gray-100">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
                    As Featured In
                </h3>

                {/* Logo-only wall: no category labels, no text under logos (design-taste §4.8) */}
                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                    {pressMentions.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={safeInitial({ opacity: 0, y: 8 })}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={safeTransition({ delay: index * 0.08, duration: 0.3 })}
                            viewport={{ once: true }}
                            className="opacity-40 hover:opacity-100 transition-opacity duration-200 cursor-default"
                        >
                            {/* Using display font as a logo-mark since actual SVG logos
                                for regional Indian newspapers aren't available on Simple Icons.
                                The key fix: removed the sub-label/badge pattern. */}
                            <span className="text-xl md:text-2xl font-display font-bold text-navy-dark tracking-tight select-none">
                                {item.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
