
"use client";

import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Users, ArrowRight, Quote, Heart, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cloudinary } from "@/lib/cloudinary-images";
import { useEffect, useState } from "react";
import { getCMSCareers, CMSCareerItem } from "@/lib/cms-fetch";

const defaultOpenings = [
  {
    role: "PGT - Mathematics",
    type: "Full Time",
    dept: "Senior Secondary",
    exp: "3-5 Years",
    description: "We are looking for an experienced PGT Mathematics teacher for Senior Secondary classes. Strong command over subject and JEE preparation experience preferred."
  },
  {
    role: "TGT - English",
    type: "Full Time",
    dept: "Middle School",
    exp: "2-4 Years",
    description: "Passionate English educator required for Middle School. Must have excellent communication skills and experience with creative writing workshops."
  },
  {
    role: "Sports Coach (Basketball)",
    type: "Part Time / Full Time",
    dept: "Sports Academy",
    exp: "2+ Years",
    description: "Certified basketball coach needed to train school teams and manage evening sports academies."
  }
];

const benefits = [
  {
    icon: Users,
    title: "Collaborative Culture",
    desc: "Work with supportive peers in a growth-oriented environment."
  },
  {
    icon: GraduationCap,
    title: "Professional Growth",
    desc: "Regular workshops, training sessions, and career advancement opportunities."
  },
  {
    icon: Heart,
    title: "Best-in-Class Perks",
    desc: "Competitive salary, transport facilities, and child fee subsidies."
  }
];

export default function CareersPageClient() {
  const [openings, setOpenings] = useState(defaultOpenings);

  useEffect(() => {
    const loadCareers = async () => {
      const jobs = await getCMSCareers();
      if (jobs.length > 0) {
        const mappedJobs = jobs.map(j => ({
          role: j.role,
          type: "Full Time", // Default
          dept: "Academic", // Default
          exp: j.experience,
          description: j.description
        }));
        setOpenings(mappedJobs);
      }
    };
    loadCareers();
  }, []);

  const handleApply = (role: string) => {
    window.location.href = `mailto:careers@siakhargone.in?subject=Application for ${role}`;
  };

  return (
    <div className="min-h-screen bg-grain">

      {/* 1. Parallax Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src={cloudinary.infrastructure.building[0]}
            alt="SIA Campus"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 drop-shadow-lg">
              Join our <span className="text-gold">Mission</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              Shape the minds of tomorrow in an environment that values innovation, integrity, and growth.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowRight className="rotate-90 w-8 h-8" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-20">

        {/* 2. Why Join Us (Features) */}
        <div className="grid md:grid-cols-3 gap-8 mb-24 -mt-32 relative z-20">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-white shadow-xl border-t-4 border-gold text-center py-8 hover:shadow-2xl transition-all h-full">
                  <CardContent>
                    <div className="bg-navy/5 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-navy" />
                    </div>
                    <h3 className="font-bold text-xl text-navy mb-3 font-display">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* 3. Teacher's Voice (Testimonial) */}
        <Section className="bg-white rounded-3xl overflow-hidden shadow-2xl mb-24 p-0">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="bg-navy p-12 md:p-16 flex flex-col justify-center text-white relative">
              <Quote className="w-16 h-16 text-gold/20 absolute top-8 left-8" />
              <blockquote className="relative z-10 text-2xl md:text-3xl font-light italic leading-relaxed mb-8">
                "At SIA, I found more than just a job. I found a family that supports my professional growth and a classroom where I can truly innovate."
              </blockquote>
              <div>
                <cite className="not-italic font-bold text-lg text-gold block">Mrs. Aishwarya Singh</cite>
                <span className="text-white/60 text-sm">Senior Coordinator (Science)</span>
              </div>
            </div>
            <div className="relative h-[400px] md:h-auto bg-gray-200">
              <Image
                src={cloudinary.infrastructure.classrooms[2]} // Using a classroom shot as fallback context
                alt="Teacher at SIA"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/50 to-transparent md:bg-gradient-to-r md:from-navy md:to-transparent" />
            </div>
          </div>
        </Section>

        {/* 4. Current Openings */}
        <div id="openings" className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-wider uppercase text-sm">Opportunities</span>
            <h2 className="text-4xl font-display font-bold text-navy mt-2">Current Openings</h2>
          </div>

          <div className="grid gap-6">
            {openings.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group hover:border-gold border-l-4 border-l-transparent hover:border-l-gold transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden">
                  <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-bold text-navy group-hover:text-gold-dark transition-colors">{job.role}</h3>
                        <span className="bg-navy/5 text-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide md:hidden">
                          {job.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground mb-4">
                        <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1 text-gold" /> {job.dept}</span>
                        <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-1 text-gold" /> {job.type}</span>
                        <span className="flex items-center"><GraduationCap className="w-4 h-4 mr-1 text-gold" /> {job.exp}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed max-w-2xl">{job.description}</p>
                    </div>

                    <div className="flex items-center justify-end">
                      <Button
                        onClick={() => handleApply(job.role)}
                        size="lg"
                        className="w-full md:w-auto bg-navy hover:bg-gold hover:text-navy transition-all duration-300 font-bold px-8 shadow-lg hover:shadow-gold/20"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* General Application CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy-dark text-white rounded-2xl p-8 md:p-12 mt-16 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-12 -mt-12" />

            <h3 className="text-2xl font-bold mb-4 relative z-10">Don't see a fitting role?</h3>
            <p className="text-white/70 mb-8 max-w-xl mx-auto relative z-10">
              We are always looking for exceptional talent to join our family. Send your resume to us, and we will contact you when a position opens.
            </p>
            <Button
              onClick={() => handleApply("Generic Position")}
              variant="outline"
              className="relative z-10 border-gold text-gold hover:bg-gold hover:text-navy px-8 py-6 text-lg"
            >
              Send Resume via Email
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
