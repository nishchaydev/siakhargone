"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/common/Section";
import { Card, CardContent } from "@/components/ui/card";

// const achievements = ... // Removed static data

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

export function AchievementsSection({ news = [] }: { news?: any[] }) {
  if (!news || news.length === 0) return null;

  return (
    <Section id="achievements" title="News" subtitle="Celebrating our students' success in academics and activities.">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {news.map((item: any, index: number) => (
          <motion.div key={item.id || index} variants={itemVariants}>
            <div className="card-premium flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={item.image || "https://picsum.photos/800/600"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">{item.date}</p>
                <h3 className="font-bold text-primary text-lg leading-tight mb-3 flex-grow">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{item.description}</p>
                <Link href={`/news/${item.slug || '#'}`} className="text-primary font-semibold text-sm self-start hover:underline">
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
