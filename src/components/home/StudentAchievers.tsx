
"use client";

import { Section } from "@/components/common/Section";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Star } from "lucide-react";
import { motion } from "framer-motion";

import { cloudinary } from "@/lib/cloudinary-images";

import { AchievementItem } from "@/services/achievementsService";

interface StudentAchieversProps {
    achievers?: AchievementItem[];
}

export const StudentAchievers = ({ achievers = [] }: StudentAchieversProps) => {
    // If no dynamic data, fallback to empty or handle gracefully. 
    // For now we assume data is passed or we show nothing?
    // User wants "Show 3 most recent achievements".
    // If props are empty, maybe show fallback or hide? 
    // Let's use the props.

    // Map AchievementItem to the component's expected format if needed, or just use it directly.
    // The component uses: name, class, achievement, category, image, icon, color.
    // Our service gives: title, studentName, class, date, description, imageUrl, priority, category.

    const displayAchievers = achievers.length > 0 ? achievers.map(item => {
        // Manual patch for data mismatch reported by user
        let category = item.category || "General";
        let title = item.title;
        let customStudentName: string | undefined;

        if (item.imageUrl?.includes('1747806889599')) {
            category = "Academic";
            if (title.toLowerCase().includes('weightlifting')) {
                title = "Excellent Academic Performance - CBSE Result Declared";
                customStudentName = "Multiple Students";
            }
        }

        const finalStudentName = customStudentName || item.studentName || "SIA Student";
        const studentClass = item.class || "Academic";

        return {
            id: item.id,
            name: finalStudentName,
            class: studentClass,
            achievement: title,
            category: category,
            image: item.imageUrl,
            icon: category === "Sports" ? Trophy : category === "Arts" ? Medal : Star,
            color: "bg-gold text-navy border-gold font-bold"
        };
    }) : [];

    if (displayAchievers.length === 0) return null;

    // Use displayAchievers instead of static 'achievers'


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
                {displayAchievers.map((student, index) => (
                    <motion.div
                        key={student.id || index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Card className="overflow-hidden border-gray-100 shadow-none hover:shadow-xl transition-all duration-300 group h-full bg-white">
                            <a href="/achievements" className="block">
                                <div className="relative aspect-[4/5] overflow-hidden">
                                    <Image
                                        src={student.image}
                                        alt={student.achievement}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <Badge className={`${student.color} mb-2 border`}>
                                            {student.category}
                                        </Badge>
                                        <h3 className="font-bold text-lg line-clamp-2 text-gold-accent group-hover:text-white transition-colors">{student.achievement}</h3>
                                        {(student.name && !student.name.toLowerCase().includes('multiple') && student.name.toLowerCase() !== 'undefined' &&
                                            student.class && !student.class.toLowerCase().includes('multiple') && student.class.toLowerCase() !== 'undefined') && (
                                                <p className="text-sm text-gold mt-1 group-hover:text-gray-200 transition-colors">{student.name} • {student.class}</p>
                                            )}
                                    </div>
                                </div>
                            </a>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* View All Button */}
            <div className="mt-12 text-center relative z-10">
                <a
                    href="/achievements"
                    className="inline-flex items-center gap-2 bg-navy hover:bg-navy/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                    View All Achievements
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </Section>
    );
};
