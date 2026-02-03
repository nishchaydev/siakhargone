
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Music,
  Palette,
  Cpu,
  ScrollText,
  HeartHandshake,
  BookUser,
  Medal,
  Award,
  Globe,
  type LucideIcon
} from "lucide-react";

interface ImagePlaceholder {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

interface CoCurricularItem {
  icon: string;
  title: string;
  description: string;
}

interface ScholarshipItem {
  icon: string;
  text: string;
}

interface BeyondSchoolPageClientProps {
  coCurricularItems: CoCurricularItem[];
  scholarshipItems: ScholarshipItem[];
  leadershipImage?: ImagePlaceholder;
}

const iconMap: { [key: string]: LucideIcon } = {
  Music,
  Palette,
  Cpu,
  ScrollText,
  HeartHandshake,
  BookUser,
  Medal,
  Award,
  Globe
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


export default function BeyondAcademicsPageClient({ coCurricularItems, scholarshipItems, leadershipImage }: BeyondSchoolPageClientProps) {
  return (
    <div className="bg-grain min-h-screen">
      <Section id="co-curricular" title="Beyond the Classroom" subtitle="Encouraging creativity, innovation, and self-expression" bgColor="bg-muted/50">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {coCurricularItems.map((item, index) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div key={item.title} variants={itemVariants}>
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="items-center">
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
                    >
                      {Icon && <Icon className="h-8 w-8 hover:scale-110 transition-transform duration-300" />}
                    </motion.div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      <Section id="personality" title="Personality Development" subtitle="Shaping confident, compassionate, and capable individuals">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {leadershipImage && (
              <Image src={leadershipImage.imageUrl}
                alt={leadershipImage.description}
                data-ai-hint={leadershipImage.imageHint}
                width={600}
                height={400}
                className="rounded-lg shadow-xl" />
            )}
          </motion.div>
          <motion.div
            className="prose lg:prose-lg max-w-none text-muted-foreground"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              Personality development at SIA is woven into every aspect of education. Through leadership training, communication workshops, and value-based learning, we empower students to express themselves authentically and act responsibly.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-primary">
              <li>Public speaking & leadership programs</li>
              <li>Mindfulness, yoga, and emotional intelligence sessions</li>
              <li>Collaboration and teamwork exercises</li>
              <li>Debate, writing, and expression clubs</li>
              <li>Goal-setting and motivation seminars</li>
            </ul>
          </motion.div>
        </div>
      </Section>

      <Section id="mentorship" title="Mentorship & Scholarships" subtitle="Guidance, support, and opportunities for every student" bgColor="bg-muted/50">
        <div className="max-w-4xl mx-auto prose lg:prose-lg text-muted-foreground text-center">
          <motion.div variants={itemVariants}>
            <p>
              Sanskar International Academy provides structured mentorship and scholarship programs to support exceptional talent across academics, sports, and arts. Each student is guided by mentors who help them set goals, manage growth, and pursue excellence.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Scholarship Programs Include:</h3>
            <ul className="list-none p-0 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {scholarshipItems.map((item, index) => {
                const Icon = iconMap[item.icon];
                return (
                  <li key={item.text} className="flex items-center gap-3 bg-background p-4 rounded-lg shadow-sm">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {Icon && <Icon className="h-5 w-5 text-primary hover:scale-110 transition-transform duration-300" />}
                      </div>
                    </motion.div>
                    <span className="text-foreground">{item.text}</span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-8">
              These programs ensure that merit and passion are recognized and rewarded, creating equal opportunities for every learner.
            </p>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
