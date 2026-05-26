"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Loader2, CheckCircle2, MessageSquare } from "lucide-react";
import { Section } from "@/components/common/Section";
import confetti from "canvas-confetti";

const FeedbackSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    phone: z.string().min(10, "Phone number must be valid."),
    email: z.string().email("Invalid email address.").optional().or(z.literal("")),
    category: z.string().min(1, "Please select a category."),
    message: z.string().min(10, "Message must be at least 10 characters long."),
});

type FeedbackFormValues = z.infer<typeof FeedbackSchema>;

export default function FeedbackPageClient() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<FeedbackFormValues>({
        resolver: zodResolver(FeedbackSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            category: "General Feedback",
            message: "",
        },
    });

    async function onSubmit(data: FeedbackFormValues) {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/public/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to submit feedback");

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            setIsSuccess(true);
            form.reset();
        } catch (error) {
            console.error("Feedback submission error:", error);
            alert("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-16">
            <Section>
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-4 bg-navy/5 rounded-full mb-2">
                            <MessageSquare className="w-8 h-8 text-navy" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-navy">Parent Feedback</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We value your thoughts and suggestions. Please let us know how we can improve our school and services.
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="text-center py-12 space-y-6 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-navy">Thank You!</h3>
                                <p className="text-gray-600 mt-2">
                                    Your feedback has been successfully submitted. We appreciate your time and will review it shortly.
                                </p>
                            </div>
                            <Button className="bg-navy hover:bg-navy-dark text-white font-bold h-12 px-8" onClick={() => setIsSuccess(false)}>
                                Submit Another Feedback
                            </Button>
                        </div>
                    ) : (
                        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-gray-100">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-navy font-bold">Your Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter your full name" {...field} className="bg-gray-50 focus:bg-white" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-navy font-bold">Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+91 99999 99999" {...field} className="bg-gray-50 focus:bg-white" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-navy font-bold">Email (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="you@example.com" {...field} className="bg-gray-50 focus:bg-white" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-navy font-bold">Category</FormLabel>
                                                    <FormControl>
                                                        <select
                                                            className="flex h-10 w-full rounded-md border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                            {...field}
                                                        >
                                                            <option value="General Feedback">General Feedback</option>
                                                            <option value="Academics">Academics</option>
                                                            <option value="Facilities">Facilities</option>
                                                            <option value="Transport">Transport</option>
                                                            <option value="Events & Activities">Events & Activities</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-navy font-bold">Your Feedback</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Please share your thoughts..."
                                                        {...field}
                                                        className="bg-gray-50 focus:bg-white resize-none min-h-[150px]"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-bold h-12 text-lg rounded-xl shadow-lg" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                                            </>
                                        ) : (
                                            "Submit Feedback"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    )}
                </div>
            </Section>
        </main>
    );
}
