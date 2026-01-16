"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronRight, Loader2, Sparkles, User, Users, School, Bus } from "lucide-react";
import confetti from "canvas-confetti";
import PageBanner from "@/components/common/PageBanner";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface ImagePlaceholder {
    id: string;
    description: string;
    imageUrl: string;
    imageHint: string;
}

interface AdmissionsPageClientProps {
    careerCounsellingImage?: ImagePlaceholder;
}

type FormStep = 1 | 2 | 3 | 4 | 5;

interface formData {
    // Student Info
    studentName: string;
    dob: string;
    gender: "Male" | "Female" | "Other";
    currentClass: string;
    grade: string; // Applying for Class

    // Academic Background
    currentSchool: string;
    board: string;

    // Parent Info
    fatherName: string;
    fatherMobile: string;
    fatherEmail: string;
    motherName: string;
    motherMobile: string;
    motherEmail: string;
    address: string;

    // Additional Info
    transportRequired: "Yes" | "No";
    visitTime: string;
}

export default function AdmissionsPageClient({ careerCounsellingImage }: AdmissionsPageClientProps) {
    const [step, setStep] = useState<FormStep>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const { register, handleSubmit, control, formState: { errors }, trigger, watch, setValue } = useForm<formData>({
        defaultValues: {
            studentName: "",
            dob: "",
            gender: "Male",
            currentClass: "",
            grade: "",
            currentSchool: "",
            board: "",
            fatherName: "",
            fatherMobile: "",
            fatherEmail: "",
            motherName: "",
            motherMobile: "",
            motherEmail: "",
            address: "",
            transportRequired: "No",
            visitTime: ""
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
                    body: JSON.stringify({ ...data, type: "admission_enquiry_2026_27" }),
                });
            } else {
                console.log("No Google Script URL provided. Data:", data);
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating
            }
        } catch (error) {
            console.error("Error submitting form", error);
        }

        setIsSubmitting(false);
        setStep(5);
        triggerConfetti();
    };

    const nextStep = async () => {
        let fieldsToValidate: (keyof formData)[] = [];

        if (step === 1) fieldsToValidate = ['studentName', 'dob', 'gender', 'currentClass', 'grade', 'currentSchool', 'board'];
        if (step === 2) fieldsToValidate = ['fatherName', 'fatherMobile', 'motherName', 'address'];

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            setStep(prev => Math.min(prev + 1, 5) as FormStep);
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
            <PageBanner
                title="Admissions 2026-27"
                subtitle="Join the Sanskar family. Begin your journey towards excellence today."
                image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
            />

            <Section id="admission-form" title="Admission Enquiry Form 2026-27" subtitle="Begin your journey with us" bgColor="bg-gray-50">
                <div className="max-w-4xl mx-auto mb-16">
                    <Card className="bg-navy text-white p-6 md:p-8 rounded-xl relative overflow-hidden">
                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-2xl font-bold font-display mb-4 text-gold">Documents Required From Parents:</h3>
                                <ul className="space-y-3">
                                    {[
                                        "1. Birth Certificate of the Child",
                                        "2. Aadhaar Card (Child + Parents)",
                                        "3. Passport-size Photos (Child: 4–6, Parents: 2 each)",
                                        "4. Previous School Report Card / TC",
                                        "5. Medical Fitness Certificate & Vaccination Record",
                                        "6. Address Proof (Electricity bill, Passport, etc.)",
                                        "7. Caste/Category Certificate (if applicable)",
                                        "8. Income Certificate (if required for concessions)"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
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

                <div className="max-w-4xl mx-auto mb-16">
                    <Card className="bg-white border-gold/20 shadow-lg p-6 md:p-8 rounded-xl relative overflow-hidden">
                        <h3 className="text-2xl font-bold font-display mb-6 text-navy text-center">School Admission Process</h3>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                            {[
                                "1. Admission form filled completely",
                                "2. Registration fee payment",
                                "3. Student interaction / Entrance test",
                                "4. Parent orientation session",
                                "5. Verification of documents",
                                "6. Final confirmation & receipt of admission fee",
                                "7. Uniform & books list provided",
                                "8. Transport form filled (if opting for bus)",
                                "9. Emergency contact details collected",
                                "10. Consent forms (medical, media, etc.)"
                            ].map((step, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="h-8 w-8 rounded-full bg-navy/5 flex items-center justify-center shrink-0 font-bold text-navy text-sm">
                                        {i + 1}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{step.split(". ")[1]}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="max-w-3xl mx-auto">
                    {/* Progress Bar */}
                    <div className="mb-8 relative">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: `${(Math.min(step, 4) / 4) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            <span className={step >= 1 ? "text-primary" : ""}>Student</span>
                            <span className={step >= 2 ? "text-primary" : ""}>Parents</span>
                            <span className={step >= 3 ? "text-primary" : ""}>More Info</span>
                            <span className={step >= 4 ? "text-primary" : ""}>Review</span>
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
                                        <h3 className="text-xl font-bold font-display text-navy flex items-center gap-2">
                                            <User className="h-5 w-5 text-gold" /> Student Information
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2 space-y-2">
                                                <Label htmlFor="studentName">Full Name</Label>
                                                <Input id="studentName" placeholder="Enter full name" {...register("studentName", { required: "Name is required" })} />
                                                {errors.studentName && <span className="text-destructive text-xs">{errors.studentName.message}</span>}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="dob">Date of Birth</Label>
                                                <Input id="dob" type="date" {...register("dob", { required: "Required" })} />
                                                {errors.dob && <span className="text-destructive text-xs">{errors.dob.message}</span>}
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Gender</Label>
                                                <Controller
                                                    name="gender"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="Male" id="r1" />
                                                                <Label htmlFor="r1">Male</Label>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="Female" id="r2" />
                                                                <Label htmlFor="r2">Female</Label>
                                                            </div>
                                                        </RadioGroup>
                                                    )}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="currentClass">Current Class / Grade</Label>
                                                <Input id="currentClass" placeholder="e.g. 5th Standard" {...register("currentClass", { required: "Required" })} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="grade">Applying For Class / Grade</Label>
                                                <Select onValueChange={(val) => setValue('grade', val)} defaultValue={formData.grade}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Class" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11"].map(g => (
                                                            <SelectItem key={g} value={g}>{g}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="currentSchool">Current School Name</Label>
                                                <Input id="currentSchool" placeholder="School name" {...register("currentSchool")} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="board">Board</Label>
                                                <Select onValueChange={(val) => setValue('board', val)} defaultValue={formData.board}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Board" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {["CBSE", "ICSE", "State Board", "Other"].map(g => (
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
                                        <h3 className="text-xl font-bold font-display text-navy flex items-center gap-2">
                                            <Users className="h-5 w-5 text-gold" /> Parent / Guardian Details
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Father */}
                                            <div className="space-y-4 md:col-span-2">
                                                <h4 className="font-semibold text-primary border-b pb-1">Father's Details</h4>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Father's Name</Label>
                                                        <Input placeholder="Full Name" {...register("fatherName", { required: "Father's name is required" })} />
                                                        {errors.fatherName && <span className="text-destructive text-xs">{errors.fatherName.message}</span>}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Mobile</Label>
                                                        <Input placeholder="10-digit Mobile" type="tel" {...register("fatherMobile", { required: "Mobile number is required", pattern: { value: /^[0-9]{10,12}$/, message: "Please enter valid 10-digit mobile number" } })} />
                                                        {errors.fatherMobile && <span className="text-destructive text-xs">{errors.fatherMobile.message}</span>}
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <Label>Email (Optional)</Label>
                                                        <Input placeholder="Email Address" type="email" {...register("fatherEmail")} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Mother */}
                                            <div className="space-y-4 md:col-span-2">
                                                <h4 className="font-semibold text-primary border-b pb-1">Mother's Details</h4>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Mother's Name</Label>
                                                        <Input placeholder="Full Name" {...register("motherName", { required: "Mother's name is required" })} />
                                                        {errors.motherName && <span className="text-destructive text-xs">{errors.motherName.message}</span>}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Mobile</Label>
                                                        <Input placeholder="10-digit Mobile" type="tel" {...register("motherMobile", { pattern: { value: /^[0-9]{10,12}$/, message: "Please enter valid 10-digit mobile number" } })} />
                                                        {errors.motherMobile && <span className="text-destructive text-xs">{errors.motherMobile.message}</span>}
                                                    </div>
                                                    <div className="space-y-2 md:col-span-2">
                                                        <Label>Email (Optional)</Label>
                                                        <Input placeholder="Email Address" type="email" {...register("motherEmail")} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label>Address</Label>
                                                <Textarea placeholder="Current residential address" {...register("address", { required: "Address is required" })} />
                                                {errors.address && <span className="text-destructive text-xs">{errors.address.message}</span>}
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
                                        <h3 className="text-xl font-bold font-display text-navy flex items-center gap-2">
                                            <Bus className="h-5 w-5 text-gold" /> Additional Information
                                        </h3>
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <Label className="text-base">Transport Required?</Label>
                                                <Controller
                                                    name="transportRequired"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                                            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 w-full">
                                                                <RadioGroupItem value="Yes" id="t1" />
                                                                <Label htmlFor="t1">Yes</Label>
                                                            </div>
                                                            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50 w-full">
                                                                <RadioGroupItem value="No" id="t2" />
                                                                <Label htmlFor="t2">No</Label>
                                                            </div>
                                                        </RadioGroup>
                                                    )}
                                                />
                                            </div>

                                            <div className="space-y-3">
                                                <Label>Preferred Time for School Visit / Interaction</Label>
                                                <Input placeholder="e.g. Morning 10-12 AM or Weekend" {...register("visitTime")} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-xl font-bold font-display text-navy">Review & Submit</h3>
                                        <div className="bg-muted/30 p-4 rounded-lg space-y-4 text-sm">
                                            <div>
                                                <p className="font-bold text-primary mb-2">Student</p>
                                                <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                                                    <p>Name: <span className="text-foreground">{formData.studentName}</span></p>
                                                    <p>Class: <span className="text-foreground">{formData.grade}</span></p>
                                                    <p>DOB: <span className="text-foreground">{formData.dob}</span></p>
                                                </div>
                                            </div>
                                            <div className="border-t pt-2">
                                                <p className="font-bold text-primary mb-2">Parents</p>
                                                <div className="grid grid-cols-1 gap-1 text-muted-foreground">
                                                    <p>Father: <span className="text-foreground">{formData.fatherName} ({formData.fatherMobile})</span></p>
                                                    <p>Mother: <span className="text-foreground">{formData.motherName}</span></p>
                                                </div>
                                            </div>
                                            <div className="border-t pt-2">
                                                <p className="font-bold text-primary mb-2">Preferences</p>
                                                <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                                                    <p>Transport: <span className="text-foreground">{formData.transportRequired}</span></p>
                                                    <p>Visit: <span className="text-foreground">{formData.visitTime || "Flexible"}</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground text-center">
                                            By clicking Submit, you confirm that the details provided are accurate.
                                        </p>
                                    </motion.div>
                                )}

                                {step === 5 && (
                                    <motion.div
                                        key="step5"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8 space-y-4"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Sparkles className="h-10 w-10 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold font-display text-navy">Enquiry Received!</h3>
                                        <p className="text-muted-foreground max-w-sm mx-auto">
                                            Thank you for your interest in Sanskar International Academy. Our admissions team will contact you shortly to schedule an interaction.
                                        </p>
                                        <div className="pt-4">
                                            <Button asChild className="bg-gold hover:bg-gold/90 text-navy font-bold">
                                                <Link href="/">Back to Home</Link>
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            {step < 5 && (
                                <div className="flex justify-between mt-8 pt-4 border-t">
                                    <Button
                                        onClick={prevStep}
                                        disabled={step === 1 || isSubmitting}
                                        className={step === 1 ? "invisible" : "bg-gold hover:bg-gold/90 text-navy font-bold"}
                                    >
                                        Back
                                    </Button>

                                    {step === 4 ? (
                                        <Button
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={isSubmitting}
                                            className="bg-gold hover:bg-gold/90 text-navy font-bold"
                                        >
                                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
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

            <Section id="faqs" title="Frequently Asked Questions" subtitle="Common queries about admissions at SIA" bgColor="bg-white">
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is the age criteria for admission?</AccordionTrigger>
                            <AccordionContent>
                                For Nursery, the child must be 3+ years as of March 31st of the academic year. For Class 1, the age should be 6+ years. Age criteria for other classes follow accordingly.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is transport facility available?</AccordionTrigger>
                            <AccordionContent>
                                Yes, we have a fleet of GPS-enabled buses covering the entire Khargone city and nearby rural areas within a 20km radius.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What is the student-teacher ratio?</AccordionTrigger>
                            <AccordionContent>
                                We maintain a healthy student-teacher ratio of 25:1 in Pre-Primary and 30:1 in higher classes to ensure personalized attention for every student.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Do you offer sports and co-curricular activities?</AccordionTrigger>
                            <AccordionContent>
                                Absolutely. We have facilities for Cricket, Football, Basketball, skating, and Taekwondo. We also offer Music, Dance, Art & Craft, and Robotics as part of the curriculum.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>How can I pay the school fees?</AccordionTrigger>
                            <AccordionContent>
                                Fees can be paid online via our school app/portal, or via Cheque/DD at the school reception. We also accept UPI and Card payments.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
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
