"use client";

import PageBanner from "@/components/common/PageBanner";
import { Section } from "@/components/common/Section";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Award, Star, Sparkles, Construction } from "lucide-react";
import Link from "next/link";
import { AchievementItem } from "@/services/achievementsService";
import { motion } from "framer-motion";
import PageTransition from "@/components/common/PageTransition";

interface AchievementsPageClientProps {
    initialAchievements: AchievementItem[];
}

export default function AchievementsPageClient({ initialAchievements = [] }: AchievementsPageClientProps) {
    return (
        <PageTransition>
            <div className="bg-grain min-h-screen">
                <Breadcrumbs items={[{ name: "Achievements" }]} />
                <PageBanner
                    title="Our Pride & Glory"
                    subtitle="Celebrating the milestones and victories of our students."
                    image="https://images.unsplash.com/photo-1546519638-68e109498ee2?q=80&w=2070&auto=format&fit=crop"
                />

                {/* Coming Soon Section */}
                <Section 
                    id="achievements" 
                    title="Student Achievements" 
                    subtitle="Something Exciting is Coming"
                    className="py-20"
                >
                    <div className="max-w-4xl mx-auto">
                        {/* Animated Icon Grid */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex justify-center gap-8 mb-12"
                        >
                            <motion.div
                                animate={{ 
                                    y: [0, -10, 0],
                                    rotate: [0, 5, 0, -5, 0]
                                }}
                                transition={{ 
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Trophy className="w-16 h-16 text-gold drop-shadow-lg" />
                            </motion.div>
                            <motion.div
                                animate={{ 
                                    y: [0, -15, 0],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ 
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.2
                                }}
                            >
                                <Medal className="w-16 h-16 text-navy drop-shadow-lg" />
                            </motion.div>
                            <motion.div
                                animate={{ 
                                    y: [0, -10, 0],
                                    rotate: [0, -5, 0, 5, 0]
                                }}
                                transition={{ 
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.4
                                }}
                            >
                                <Award className="w-16 h-16 text-gold drop-shadow-lg" />
                            </motion.div>
                        </motion.div>

                        {/* Main Message */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-center mb-10"
                        >
                            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-6 py-3 rounded-full mb-6 font-semibold">
                                <Construction className="w-5 h-5" />
                                Under Construction
                            </div>
                            
                            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 flex items-center justify-center gap-3">
                                We're Working on Your Achievements
                                <Sparkles className="w-8 h-8 text-gold" />
                            </h2>
                            
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                                Our team is currently curating an inspiring collection of student achievements, awards, and success stories. 
                                This page will showcase the remarkable accomplishments of our talented students across academics, sports, arts, and more!
                            </p>

                            <div className="bg-gradient-to-r from-navy/5 via-gold/5 to-navy/5 rounded-2xl p-8 mb-8">
                                <p className="text-lg text-navy font-medium mb-4">
                                    🏆 What to expect:
                                </p>
                                <ul className="text-left text-gray-700 space-y-3 max-w-xl mx-auto">
                                    <li className="flex items-start gap-3">
                                        <Star className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                                        <span>Academic excellence and board exam toppers</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Star className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                                        <span>Sports championships and athletic achievements</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Star className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                                        <span>Cultural competitions and artistic accomplishments</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Star className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                                        <span>National and international recognitions</span>
                                    </li>
                                </ul>
                            </div>

                            <p className="text-gray-500 italic">
                                Check back soon to see our Hall of Fame!
                            </p>
                        </motion.div>
                    </div>
                </Section>

                {/* Related Links Section */}
                <Section id="related" title="Explore More" subtitle="Discover Related Content" className="bg-white" >
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <Link href="/results" className="group">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                        <Trophy className="w-8 h-8 text-gold group-hover:text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">Exam Results</h3>
                                    <p className="text-gray-600 text-sm">View our academic performance and board results</p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/news-events" className="group">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                        <Star className="w-8 h-8 text-gold group-hover:text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">Latest News</h3>
                                    <p className="text-gray-600 text-sm">Stay updated with school happenings</p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/gallery" className="group">
                            <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-gold">
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
                                        <Medal className="w-8 h-8 text-gold group-hover:text-white" />
                                    </div>
                                    <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-gold transition-colors">Photo Gallery</h3>
                                    <p className="text-gray-600 text-sm">Campus life in pictures</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12 p-8 bg-navy/5 rounded-2xl">
                        <h3 className="text-2xl font-bold text-navy mb-4">Interested in joining SIA?</h3>
                        <p className="text-gray-600 mb-6">Discover how our students excel in every field</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/admissions" className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl">
                                Apply for Admissions 2026-27
                            </Link>
                            <Link href="/about" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-navy border-2 border-navy px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                                Learn More About SIA
                            </Link>
                        </div>
                    </div>
                </Section>
            </div>
        </PageTransition>
    );
}
