
"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  bgColor?: string;
  isFirstSection?: boolean;
  className?: string; // Added to allow custom classes
  style?: React.CSSProperties;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

export function Section({ id, title, subtitle, children, bgColor = 'bg-background', isFirstSection = false, className, style }: SectionProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const sectionPadding = isFirstSection ? "pt-32 md:pt-40 pb-28 md:pb-32" : "py-28 md:py-32";

  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn("px-4 sm:px-6 lg:px-8", sectionPadding, bgColor, className)}
      style={style}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16 md:mb-20">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline text-primary">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className="text-left">{children}</div>
      </div>
    </motion.section>
  );
}
