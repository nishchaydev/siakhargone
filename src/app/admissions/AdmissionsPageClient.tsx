"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronRight, Loader2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface ImagePlaceholder {
    id: string;
    description: string;
    imageUrl: string;
    imageHint: string;
}

interface AdmissionsPageClientProps {
    careerCounsellingImage?: ImagePlaceholder;
}

type FormStep = 1 | 2 | 3 | 4;

interface formData {
    studentName: string;
    dob: string;
    grade: string;
    parentName: string;
    phone: string;
    email: string;
}

export default function AdmissionsPageClient({ careerCounsellingImage }: AdmissionsPageClientProps) {
    const [step, setStep] = useState<FormStep>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const { register, handleSubmit, formState: { errors }, trigger, watch, setValue } = useForm<formData>({
        defaultValues: {
            studentName: "",
            dob: "",
            grade: "",
            parentName: "",
            phone: "",
            email: ""
        }
    });

    const formData = watch();
    // -------------------------------------------------------------------------
    // 🔴 PASTE YOUR GOOGLE WEP APP URL HERE
    // -------------------------------------------------------------------------
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby_3P0A5riBZOD9QZvZU1tYPSrDeg4onMhrbQG4UxGqTEPsdq63qe1wvNsoBCNtUqmlAA/exec";

    const onSubmit = async (data: formData) => {
        setIsSubmitting(true);

        try {
            if (GOOGLE_SCRIPT_URL) {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors", // Important for Google Sheets
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...data, type: "admission" }),
                });
            } else {
                // Determine if we should warn the user (dev mode) or just simulate (prod)
                console.log("No Google Script URL provided. Data:", data);
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating
            }
        } catch (error) {
            console.error("Error submitting form", error);
        }

        setIsSubmitting(false);
        setStep(4);
        triggerConfetti();
    };

    const nextStep = async () => {
        const fieldsToValidate = step === 1
            ? ['studentName', 'dob', 'grade']
            : ['parentName', 'phone', 'email'];

        const isValid = await trigger(fieldsToValidate as any);
        if (isValid) {
            setStep(prev => Math.min(prev + 1, 4) as FormStep);
        }
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1) as FormStep);
    };

    const triggerConfetti = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div className="bg-grain min-h-screen">
            <Section id="career" title="Career Counselling" subtitle="Guiding students towards purposeful futures" isFirstSection={true}>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="prose lg:prose-lg max-w-none text-muted-foreground"
                    >
                        <p>
                            At Sanskar International Academy, we help every learner discover their strengths and ambitions through structured <strong>career counselling</strong> and mentorship programs.
                            From psychometric assessments to personalized guidance, students receive the clarity and confidence they need to choose the right path.
                        </p>
                        <ul className="space-y-3 mt-4">
                            <li className="flex items-start"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1"><Check className="h-5 w-5 text-primary" /></div> Aptitude and personality assessments</li>
                            <li className="flex items-start"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1"><Check className="h-5 w-5 text-primary" /></div> One-on-one counselling and goal-setting</li>
                            <li className="flex items-start"><div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-1"><Check className="h-5 w-5 text-primary" /></div> Internship and work experience programs</li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {careerCounsellingImage && (
                            <Image src={careerCounsellingImage.imageUrl} alt={careerCounsellingImage.description} width={600} height={400} className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500" data-ai-hint={careerCounsellingImage.imageHint} priority />
                        )}
                    </motion.div>
                </div>
            </Section>

            <Section id="admission-form" title="Apply for Admission" subtitle="Begin your journey with us in just a few steps" bgColor="bg-cream">
                <div className="max-w-4xl mx-auto mb-16">
                    <Card className="bg-navy text-white p-6 md:p-8 rounded-xl relative overflow-hidden">
                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold font-display mb-4 text-gold">Required For Admission:</h3>
                                <ul className="space-y-3">
                                    {["3 Passport Size Photos", "Birth Certificate (Original & Copy)", "Aadhar Card (Student & Parents)", "Previous Class Marksheet", "Bank Account Details", "SSSM ID (Samagra ID)"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                                <Check className="h-3 w-3 text-gold" />
                                            </div>
                                            <span className="text-sm md:text-base font-medium opacity-90">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-center md:text-right hidden md:block">
                                <div className="inline-block p-4 rounded-full bg-white/5 border border-white/10">
                                    <span className="text-4xl">📄</span>
                                </div>
                                <p className="mt-2 text-sm text-white/60">Please bring these documents<br />during your school visit.</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Progress Bar */}
                    <div className="mb-8 relative">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: `${(Math.min(step, 3) / 3) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            <span className={step >= 1 ? "text-primary" : ""}>Student Info</span>
                            <span className={step >= 2 ? "text-primary" : ""}>Parent Info</span>
                            <span className={step >= 3 ? "text-primary" : ""}>Review</span>
                        </div>
                    </div>

                    <Card className="border-0 shadow-2xl overflow-hidden">
                        <CardContent className="p-8">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-xl font-bold font-display text-navy">Student Information</h3>
                                        <div className="space-y-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="studentName">Full Name</Label>
                                                <Input
                                                    id="studentName"
                                                    placeholder="Enter student's full name"
                                                    {...register("studentName", { required: "Name is required" })}
                                                />
                                                {errors.studentName && <span className="text-destructive text-xs">{errors.studentName.message}</span>}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="dob">Date of Birth</Label>
                                                <Input
                                                    id="dob"
                                                    type="date"
                                                    {...register("dob", { required: "Date of Birth is required" })}
                                                />
                                                {errors.dob && <span className="text-destructive text-xs">{errors.dob.message}</span>}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="grade">Applying For Grade</Label>
                                                <Select onValueChange={(val) => setValue('grade', val)} defaultValue={formData.grade}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Grade" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {["Nursery", "KG-1", "KG-2", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"].map(g => (
                                                            <SelectItem key={g} value={g}>{g}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-xl font-bold font-display text-navy">Parent/Guardian Information</h3>
                                        <div className="space-y-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="parentName">Parent Name</Label>
                                                <Input
                                                    id="parentName"
                                                    placeholder="Enter parent's full name"
                                                    {...register("parentName", { required: "Parent name is required" })}
                                                />
                                                {errors.parentName && <span className="text-destructive text-xs">{errors.parentName.message}</span>}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="10-digit mobile number"
                                                    {...register("phone", {
                                                        required: "Phone number is required",
                                                        pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number" }
                                                    })}
                                                />
                                                {errors.phone && <span className="text-destructive text-xs">{errors.phone.message}</span>}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    {...register("email", {
                                                        required: "Email is required",
                                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                                    })}
                                                />
                                                {errors.email && <span className="text-destructive text-xs">{errors.email.message}</span>}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-xl font-bold font-display text-navy">Review & Submit</h3>
                                        <div className="bg-muted/30 p-4 rounded-lg space-y-3 text-sm">
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-muted-foreground">Student Name</span>
                                                <span className="font-medium text-foreground">{formData.studentName}</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-muted-foreground">Grade</span>
                                                <span className="font-medium text-foreground">{formData.grade || "Not selected"}</span>
                                            </div>
                                            <div className="flex justify-between border-b pb-2">
                                                <span className="text-muted-foreground">Parent Name</span>
                                                <span className="font-medium text-foreground">{formData.parentName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Contact</span>
                                                <span className="font-medium text-foreground">{formData.phone}</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground text-center">
                                            By clicking Submit, you agree to our terms and conditions. We will contact you shortly.
                                        </p>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8 space-y-4"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Sparkles className="h-10 w-10 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold font-display text-navy">Application Received!</h3>
                                        <p className="text-muted-foreground max-w-sm mx-auto">
                                            Thank you for applying to Sanskar International Academy. Our admissions team will reach out to you at <strong>{formData.phone}</strong> within 24 hours.
                                        </p>
                                        <div className="pt-4">
                                            <Button variant="outline" asChild>
                                                <Link href="/">Back to Home</Link>
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            {step < 4 && (
                                <div className="flex justify-between mt-8 pt-4 border-t">
                                    <Button
                                        variant="ghost"
                                        onClick={prevStep}
                                        disabled={step === 1 || isSubmitting}
                                        className={step === 1 ? "invisible" : ""}
                                    >
                                        Back
                                    </Button>

                                    {step === 3 ? (
                                        <Button
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={isSubmitting}
                                            className="bg-gold hover:bg-gold/90 text-navy font-bold"
                                        >
                                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {isSubmitting ? "Submitting..." : "Submit Application"}
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={nextStep}
                                            className="bg-navy hover:bg-navy-dark text-white"
                                        >
                                            Next Step <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </Section>

            <Section id="disclosure" title="Mandatory Disclosure" subtitle="In compliance with CBSE guidelines" bgColor="bg-white">
                <Card className="card-premium p-8 text-center max-w-3xl mx-auto">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-navy/5 rounded-full">
                            <Check className="h-8 w-8 text-navy" />
                        </div>
                    </div>
                    <CardContent className="p-0 space-y-6">
                        <h3 className="text-xl font-bold font-headline text-navy">Transparency & Compliance</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We maintain complete transparency in our operations. All mandatory disclosure documents,
                            including affiliation certificates, safety clearances, and committee details,
                            are available for public viewing throughout the year.
                        </p>
                        <Button asChild size="lg" className="bg-navy hover:bg-navy-dark text-white">
                            <Link href="/mandatory-disclosure">View All Disclosure Documents</Link>
                        </Button>
                    </CardContent>
                </Card>
            </Section>
        </div>
    );
}
