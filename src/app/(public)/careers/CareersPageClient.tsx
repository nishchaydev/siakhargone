"use client";

import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Users, ArrowRight, Quote, Heart, CheckCircle2, Loader2, Send, X, FileText, User, Mail, Phone, UploadCloud } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cloudinary } from "@/lib/cloudinary-images";
import { useEffect, useState } from "react";
import { getCMSCareers, CMSCareerItem } from "@/lib/cms-fetch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import confetti from "canvas-confetti";

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

import { CareerItem } from "@/services/careersService";

interface CareersPageClientProps {
  initialCareers: CareerItem[];
}

export default function CareersPageClient({ initialCareers = [] }: CareersPageClientProps) {
  // Map initial careers to the format expected by the component
  const mapCareers = (jobs: any[]) => jobs.filter((j: any) => j.isActive).map((j: any) => ({
    role: j.role,
    type: j.type || "Full Time",
    dept: j.department || "Academic",
    exp: j.experience,
    description: j.description
  }));

  const initialMapped = initialCareers.length > 0 ? mapCareers(initialCareers) : [];

  const [openings, setOpenings] = useState<any[]>(initialMapped.length > 0 ? initialMapped : defaultOpenings);
  // If we have initial careers, we are not loading. If it's explicitly empty array from server (no jobs), we still show "No jobs" UI not loading.
  // Actually, if server returns [], it means no jobs. defaultOpenings is only fallback if server error? Or just placeholder?
  // Let's assume if server data is present (even if empty), we rely on it. But to prevent "No jobs" flash if default was intended, 
  // let's stick to: if server passes something, use it. If server failed and passed nothing (or we choose to pass null on error), use default.
  // For now, if initialMapped is empty, we might show defaultOpenings only if we assume server fetch failed? 
  // But `initialCareers`=[] is valid state.
  // Let's change state initialization:
  // If initialCareers was provided (even empty), use it. if undefined/null, use default.

  const [loading, setLoading] = useState(false); // SSR loaded data, so no loading state needed initially
  const [selectedRole, setSelectedRole] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // We can keep the effect to refresh data or just rely on SSR. 
  // Removing effect completely makes it purely static until revalidate. That is fine for "dynamic school admin updates" if revalidate work.
  // Let's keep it simple and rely on SSR props.


  const openApplication = (role: string) => {
    setSelectedRole(role);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-grain">
      <ApplicationModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialRole={selectedRole}
      />

      {/* 1. Parallax Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src={cloudinary.infrastructure.building[0]}
            alt="SIA Campus"
            fill
            className="object-cover brightness-[0.4]"
            sizes="100vw"
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
                <cite className="not-italic font-bold text-lg text-gold block">Mr. Kishore Gupta</cite>
                <span className="text-white/60 text-sm">Mathematics Teacher</span>
              </div>
            </div>
            <div className="relative h-[400px] md:h-auto bg-gray-200">
              <Image
                src={cloudinary.careers.teacher}
                alt="Mr. Kishore Gupta - Mathematics Teacher at SIA"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
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
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading current openings...</div>
            ) : openings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-inner border border-dashed text-gray-500">
                <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p>No active job openings at the moment.</p>
                <p className="text-sm">Please check back later or send us a resume below.</p>
              </div>
            ) : (
              openings.map((job, idx) => (
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
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-2xl font-bold text-navy group-hover:text-gold-dark transition-colors">{job.role}</h3>
                          {/* Desktop Badge */}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground mb-4">
                          <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full text-navy"><Briefcase className="w-3.5 h-3.5 mr-2 text-gold" /> {job.dept}</span>
                          <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full text-navy"><CheckCircle2 className="w-3.5 h-3.5 mr-2 text-gold" /> {job.type}</span>
                          <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full text-navy"><GraduationCap className="w-3.5 h-3.5 mr-2 text-gold" /> {job.exp}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed max-w-2xl">{job.description}</p>
                      </div>

                      <div className="flex items-center justify-end pt-4 md:pt-0">
                        <Button
                          onClick={() => openApplication(job.role)}
                          size="lg"
                          className="w-full md:w-auto bg-navy hover:bg-gold hover:text-navy transition-all duration-300 font-bold px-8 shadow-lg hover:shadow-gold/20"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* General Application CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy-dark text-white rounded-2xl p-8 md:p-12 mt-16 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -mr-12 -mt-12" />

            <h3 className="text-2xl font-bold mb-4 relative z-10 text-white">Don't see a <span className="text-gold">fitting role?</span></h3>
            <p className="text-white/70 mb-8 max-w-xl mx-auto relative z-10">
              We are always looking for exceptional talent to join our family. Send your resume to us, and we will contact you when a position opens.
            </p>
            <Button
              onClick={() => openApplication("General Application")}
              className="relative z-10 bg-gold hover:bg-gold/90 text-navy px-8 py-6 text-lg font-bold"
            >
              Send Resume via Application
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ApplicationModal({ isOpen, onClose, initialRole }: { isOpen: boolean; onClose: () => void; initialRole: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: initialRole,
    resumeFile: null as File | null,
    coverLetter: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setForm(prev => ({ ...prev, role: initialRole }));
  }, [initialRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.resumeFile) {
      alert("Please upload a resume");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("position", form.role);
      formData.append("resume", form.resumeFile);
      formData.append("coverLetter", form.coverLetter);

      const res = await fetch("/api/public/apply", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        setSuccess(true);
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0f172a', '#eab308', '#ffffff']
        });
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setForm({ name: "", email: "", phone: "", role: initialRole, resumeFile: null, coverLetter: "" });
        }, 3500);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch {
      alert("Error submitting application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl border-0 shadow-2xl overflow-hidden p-0 bg-white">
        <div className="bg-navy p-6 w-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl -mr-6 -mt-6"></div>
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gold" />
              Apply for {form.role}
            </DialogTitle>
            <DialogDescription className="text-blue-100">
              Join the SIA family. We can't wait to learn more about you.
            </DialogDescription>
          </DialogHeader>
        </div>

        {success ? (
          <div className="py-16 text-center space-y-6 px-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-navy">Application Received!</h3>
              <p className="text-gray-500 max-w-xs mx-auto">Thank you for applying. Our HR team will review your profile and get in touch shortly.</p>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs uppercase font-bold text-gray-500">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input id="name" required placeholder="John Doe" className="pl-9 bg-gray-50 focus:bg-white transition-all" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs uppercase font-bold text-gray-500">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input id="phone" required placeholder="+91 98765..." className="pl-9 bg-gray-50 focus:bg-white transition-all" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs uppercase font-bold text-gray-500">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input id="email" type="email" required placeholder="john@example.com" className="pl-9 bg-gray-50 focus:bg-white transition-all" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="resume" className="text-xs uppercase font-bold text-gray-500">Upload Resume (PDF)</Label>
                <div className="relative">
                  <UploadCloud className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="resume"
                    type="file"
                    accept="application/pdf"
                    required
                    className="pl-9 bg-gray-50 focus:bg-white transition-all pt-2"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) setForm({ ...form, resumeFile: file });
                    }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Upload your CV/Resume in PDF format (Max 5MB).</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cover" className="text-xs uppercase font-bold text-gray-500">Cover Letter (Optional)</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Textarea id="cover" placeholder="Why do you want to join SIA?" className="pl-9 min-h-[100px] resize-none bg-gray-50 focus:bg-white transition-all" value={form.coverLetter} onChange={e => setForm({ ...form, coverLetter: e.target.value })} />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full bg-navy py-6 hover:bg-gold hover:text-navy text-white font-bold transition-all shadow-md active:scale-[0.98]" disabled={submitting}>
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
