
"use client";

import { Section } from "@/components/common/Section";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Star } from "lucide-react";
import { motion } from "framer-motion";

import { cloudinary } from "@/lib/cloudinary-images";

export const StudentAchievers = () => {
    // Static Hall of Fame Data
    const achievers = [
        {
            name: "Star Achiever",
            class: "Class X",
            achievement: "State Level Sci-Fair Winner",
            category: "Academics",
            image: cloudinary.lab.physics[0] || "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop",
            icon: Star,
            color: "bg-gold/10 text-gold-dark border-gold/20"
        },
        {
            name: "Sports Captain",
            class: "Class XII",
            achievement: "National Sports Player",
            category: "Sports",
            image: cloudinary.sportsAchievements[6] || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop",
            icon: Trophy,
            color: "bg-green-100 text-green-700 border-green-200"
        },
        {
            name: "Creative Lead",
            class: "Class XI",
            achievement: "National Art Competition",
            category: "Arts",
            image: cloudinary.annualFunction[0] || "https://images.unsplash.com/photo-1491013516836-7dbc6430dd7d?q=80&w=2070&auto=format&fit=crop",
            icon: Medal,
            color: "bg-purple-100 text-purple-700 border-purple-200"
        }
    ];

    return (
        <Section id="achievers" className="bg-white relative overflow-hidden" isFirstSection={false}>
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-navy/5 rounded-bl-full -mr-20 -mt-20 z-0 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-tr-full -ml-10 -mb-10 z-0 pointer-events-none" />

            <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
                <span className="text-gold font-bold tracking-wider uppercase text-sm">Hall of Fame</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-navy mt-2">
                    Our <span className="text-gold-accent">Pride & Glory</span>
                </h2>
                <p className="text-muted-foreground mt-4 text-lg">
                    Celebrating the diverse talents and outstanding victories of our students on state and national platforms.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
                {achievers.map((student, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Card className="overflow-hidden border-gray-100 shadow-none hover:shadow-xl transition-all duration-300 group h-full bg-white">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src={student.image}
                                    alt={student.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Clean gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80" />

                                <div className="absolute top-4 right-4">
                                    <Badge className={`${student.color} backdrop-blur-md border shadow-sm`}>
                                        <student.icon className="w-3 h-3 mr-1" /> {student.category}
                                    </Badge>
                                </div>

                                <div className="absolute bottom-0 left-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-gold font-bold uppercase tracking-widest text-xs mb-1">
                                        {student.class}
                                    </p>
                                    <h3 className="text-2xl font-bold font-display leading-tight mb-2">
                                        {student.name}
                                    </h3>
                                    <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {student.achievement}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};
