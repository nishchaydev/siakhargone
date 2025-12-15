"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/common/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cloudinary } from "@/lib/cloudinary-images";

import { albums } from "@/lib/static-data";

const taekwondo = albums.find(a => a.albumName === "District Level Taekwando");
const annualFunction = albums.find(a => a.albumName === "Annual Function");
const sports = albums.find(a => a.albumName === "Sports & Achivements");

const achievements = [
  {
    date: "RECENT EVENT",
    title: taekwondo?.albumName || "District Level Taewando Competition",
    description: "Our students showcased outstanding skills and discipline at the District Level Taewando Competition.",
    image: taekwondo?.coverPhoto || cloudinary.districtLevelTaekwando[0],
    imageHint: "taewando competition"
  },
  {
    date: "ANNUAL EVENT",
    title: annualFunction?.albumName || "Annual Function Celebration",
    description: "A spectacular display of talent and culture by our students during the Annual Function.",
    image: annualFunction?.coverPhoto || cloudinary.annualFunction[3],
    imageHint: "annual function"
  },
  {
    date: "SPORTS",
    title: "Sports Achievements",
    description: "Celebrating the dedication and victory of our young athletes in various sports championships.",
    image: sports?.coverPhoto || cloudinary.sportsAchievements[0],
    imageHint: "sports achievements"
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
  const [selectedItem, setSelectedItem] = useState<typeof achievements[0] | null>(null);

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
            <div
              className="card-premium flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
              onClick={() => setSelectedItem(achievement)}
            >
              <div className="relative w-full aspect-[4/3]">
                <Image src={achievement.image}
                  alt={achievement.title}
                  fill
                  className="object-cover"
                  data-ai-hint={achievement.imageHint} />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">{achievement.date}</p>
                <h3 className="font-bold text-primary text-lg leading-tight mb-3 flex-grow">{achievement.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{achievement.description}</p>
                <button
                  className="text-primary font-semibold text-sm self-start hover:underline uppercase"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(achievement);
                  }}
                >
                  Read More
                </button>
              </CardContent>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0 gap-0">
          {selectedItem && (
            <>
              <div className="relative w-full h-64 md:h-80">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-gold font-medium mb-1 uppercase tracking-wider text-sm">{selectedItem.date}</p>
                  <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight text-white">
                    {selectedItem.title}
                  </DialogTitle>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-white">
                <DialogDescription className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  {selectedItem.description}
                </DialogDescription>

                <div className="mt-8 flex justify-end">
                  <Link href="/gallery" className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
                    View Gallery
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}
