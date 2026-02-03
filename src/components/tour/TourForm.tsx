
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have this or use standard textarea
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";

// Schema for Tour Booking
const TourSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    phone: z.string().min(10, "Phone number must be valid."),
    email: z.string().email("Invalid email address.").optional().or(z.literal("")),
    grade: z.string().min(1, "Please select a grade."),
    date: z.date({
        required_error: "Please select a preferred date.",
    }),
    message: z.string().optional(),
});

type TourFormValues = z.infer<typeof TourSchema>;

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

export function TourForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<TourFormValues>({
        resolver: zodResolver(TourSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            grade: "",
            message: "",
        },
    });

    async function onSubmit(data: TourFormValues) {
        setIsSubmitting(true);

        try {
            // Prepare payload
            const payload = {
                type: "enquiry",
                name: data.name,
                phone: data.phone,
                email: data.email || "N/A",
                class: data.grade, // Map 'grade' to 'class' for Enquiries sheet
                date: new Date().toISOString(), // Submission timestamp
                message: `[Tour Request] Preferred Date: ${format(data.date, "dd MMM yyyy")}. ${data.message || ""}`,
                subject: `New Tour Request: ${data.name} (${data.grade})`
            };

            // Use internal API route (leads to Enquiries sheet)
            await fetch("/api/public/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });


            // Success Animation
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            setIsSuccess(true);
            form.reset();

        } catch (error) {
            console.error("Tour submission error:", error);
            alert("Something went wrong. Please try again or contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSuccess) {
        return (
            <div className="text-center py-12 space-y-6 bg-white rounded-2xl shadow-sm border border-gold/20 p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-navy">Request Received!</h3>
                    <p className="text-gray-600 mt-2">
                        We've received your request to visit SIA. <br />
                        Our admissions team will confirm your slot shortly via phone/WhatsApp.
                    </p>
                </div>
                <Button className="w-full bg-navy hover:bg-navy-dark text-white font-bold h-12" onClick={() => setIsSuccess(false)}>
                    Book Another Visit
                </Button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-navy font-bold">Parent's Name</FormLabel>
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
                        name="grade"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-navy font-bold">Admission For Grade</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="bg-gray-50 focus:bg-white">
                                            <SelectValue placeholder="Select Grade" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="nursery">Nursery</SelectItem>
                                        <SelectItem value="kg1">KG 1</SelectItem>
                                        <SelectItem value="kg2">KG 2</SelectItem>
                                        <SelectItem value="1">Class 1</SelectItem>
                                        <SelectItem value="2">Class 2</SelectItem>
                                        <SelectItem value="3">Class 3</SelectItem>
                                        <SelectItem value="4">Class 4</SelectItem>
                                        <SelectItem value="5">Class 5</SelectItem>
                                        <SelectItem value="6">Class 6</SelectItem>
                                        <SelectItem value="7">Class 7</SelectItem>
                                        <SelectItem value="8">Class 8</SelectItem>
                                        <SelectItem value="9">Class 9</SelectItem>
                                        <SelectItem value="10">Class 10</SelectItem>
                                        <SelectItem value="11">Class 11</SelectItem>
                                        <SelectItem value="12">Class 12</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="text-navy font-bold">Preferred Visit Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal bg-gray-50 focus:bg-white text-gray-900",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-navy font-bold">Additional Message (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Any specific questions or areas you'd like to see?"
                                    {...field}
                                    className="bg-gray-50 focus:bg-white resize-none"
                                    rows={3}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-navy hover:bg-navy-dark text-white font-bold h-12 text-lg rounded-xl shadow-lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scheduling...
                        </>
                    ) : (
                        "Confirm Tour Booking"
                    )}
                </Button>
            </form>
        </Form>
    );
}
