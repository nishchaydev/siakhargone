"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/common/Section";
import { Card, CardContent } from "@/components/ui/card";

const achievements = [
  {
    date: "NOVEMBER 3, 2025",
    title: "SIA Won Awards at the Yoga Open State Competition",
    description: "Our students showcased outstanding performances at the Yoga Open State Competition held in Indore, M.P.",
    image: "https://picsum.photos/seed/achievement1/800/600",
    imageHint: "students yoga competition"
  },
  {
    date: "NOVEMBER 3, 2025",
    title: "SIA Heights Participated in the Round Square Zoom Postcard",
    description: "Students from our school joined the international Round Square Zoom event hosted by Hilton College, South Africa, themed 'Community Partnerships'.",
    image: "https://picsum.photos/seed/achievement2/800/600",
    imageHint: "students video conference"
  },
  {
    date: "NOVEMBER 1, 2025",
    title: "SIA Won Awards in Drawing Competition",
    description: "Students achieved top ranks across multiple categories at the Inter-School Drawing Competition held at St. Norbert School, Indore.",
    image: "https://picsum.photos/seed/achievement3/800/600",
    imageHint: "students drawing competition"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function AchievementsSection() {
  return (
    <Section id="achievements" title="News" subtitle="Celebrating our students' success in academics and activities.">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {achievements.map((achievement, index) => (
          <motion.div key={index} variants={itemVariants}>
            <div className="card-premium flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={achievement.image}
                  alt={achievement.title}
                  fill
                  className="object-cover"
                  data-ai-hint={achievement.imageHint}
                />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">{achievement.date}</p>
                <h3 className="font-bold text-primary text-lg leading-tight mb-3 flex-grow">{achievement.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{achievement.description}</p>
                <Link href="#" className="text-primary font-semibold text-sm self-start hover:underline">
                  READ MORE
                </Link>
              </CardContent>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
