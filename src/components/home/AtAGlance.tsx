"use client";

import { Section } from "@/components/common/Section";
import { Bus, Calendar, Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
        icon: Award,
        title: "CBSE Affiliation",
        description: "Affiliated to CBSE, New Delhi. Affiliation No: 1031345",
        // Navy button style (Logo Color)
        className: "bg-navy text-white shadow-navy/40"
    },
    {
        icon: Bus,
        title: "Transport Facility",
        description: "Safe & GPS-enabled buses covering 15+ routes in Khargone district.",
        className: "bg-navy text-white shadow-navy/40"
    },
    {
        icon: Calendar,
        title: "Admissions 2026-27",
        description: "Applications open. Session begins April 2026. Limited seats.",
        className: "bg-navy text-white shadow-navy/40"
    },
    {
        icon: Clock,
        title: "School Timings",
        description: "Mon-Sat: 08:30 AM to 02:10 PM. Reception: 09:00 AM - 04:00 PM.",
        className: "bg-navy text-white shadow-navy/40"
    }
];

export const AtAGlance = () => {
    return (
        <Section className="py-2 pt-8 md:pt-12 pb-8 bg-white border-b border-gray-100 relative overflow-hidden">
            {/* Background Decorative Elements Removed as per request */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {features.map((feature, index) => (
                    <Card key={index} className="border-none shadow-none hover:bg-gray-50 transition-colors bg-transparent group rounded-2xl p-2">
                        <CardContent className="p-4 flex flex-row items-start gap-4">
                            <div className={`p-3 rounded-xl shrink-0 transition-all duration-300 group-hover:scale-110 shadow-lg ${feature.className}`}>
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold font-display text-navy text-lg leading-tight group-hover:text-gold-dark transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Section>
    );
};
