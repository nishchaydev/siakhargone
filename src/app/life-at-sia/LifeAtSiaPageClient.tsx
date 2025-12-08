
"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/common/Section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  UserCheck,
  Globe,
  HeartHandshake,
  Users,
  Lightbulb,
  Layers,
  FlaskConical,
  MonitorSmartphone,
  type LucideIcon
} from "lucide-react";

interface Item {
  icon: string;
  title: string;
  description: string;
}

interface LifeAtSiaPageClientProps {
  whySiaItems: Item[];
  methodologySteps: Item[];
}

const iconMap: { [key: string]: LucideIcon } = {
  Sparkles,
  UserCheck,
  Globe,
  HeartHandshake,
  Users,
  Lightbulb,
  Layers,
  FlaskConical,
  MonitorSmartphone
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

export default function LifeAtSiaPageClient({ whySiaItems, methodologySteps }: LifeAtSiaPageClientProps) {
  return (
    <div className="bg-grain min-h-screen">
      <Section
        id="why-sia"
        title="Why Study at Sanskar International Academy"
        subtitle="Because education here means transformation."
        isFirstSection={true}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {whySiaItems.map((item, index) => {
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

      <Section
        id="learning"
        title="Methodology & Learning"
        subtitle="Innovative. Inclusive. Inspiring."
        bgColor="bg-muted/50"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative">

            <motion.div
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {methodologySteps.map((step, index) => {
                const Icon = iconMap[step.icon];
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={step.title}
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className={`md:flex items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                      <div className="md:w-5/12">
                        <Card className="p-6 rounded-lg shadow-md">
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </Card>
                      </div>

                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex">
                        <motion.div
                          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
                        >
                          {Icon && <Icon className="h-7 w-7 hover:scale-110 transition-transform duration-300" />}
                        </motion.div>
                      </div>

                      <div className="w-full md:w-1/12 my-4 md:my-0 h-0.5 md:h-auto md:w-auto bg-border md:hidden"></div>

                      <div className="md:w-5/12"></div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Section>
    </div>
  );
}
