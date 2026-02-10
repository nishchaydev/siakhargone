
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import { Users, UserCheck, Award, Calendar } from "lucide-react";

const stats = [
  { icon: Users, value: 1500, label: "Students Enrolled", suffix: "+" },
  { icon: UserCheck, value: 75, label: "Teachers", suffix: "+" },
  { icon: Calendar, value: 10, label: "Years of Excellence", suffix: "+" },
  { icon: Award, value: 50, label: "Awards Won", suffix: "+" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="bg-navy text-white py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
            Our Achievements
          </h2>
        </motion.div>
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <div className="flex justify-center mb-4">
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + (index * 0.1) }}
                  >
                    <Icon className="w-8 h-8 text-accent hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                </div>
                <div className="text-4xl font-bold text-white">
                  {isInView && (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <p className="text-muted-foreground text-white/80 mt-2">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
