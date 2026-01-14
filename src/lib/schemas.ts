
import { z } from "zod";

export const ContactFormSchema = z.object({
    name: z.string().min(2, "Name is too short").max(50, "Name is too long"),
    phone: z.string().regex(/^[0-9+\-\s()]{10,20}$/, "Invalid phone number format"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    class: z.string().min(1, "Please select a class"),
    message: z.string().min(5, "Message is too short").max(1000, "Message is too long"),
}).strict();

export const ApplyFormSchema = z.object({
    name: z.string().min(2, "Name is required").max(100, "Name is too long"),
    email: z.string().email("Invalid email").max(100, "Email is too long"),
    phone: z.string().min(10, "Phone number is required").max(20, "Phone number is too long"),
    position: z.string().min(2, "Position is required").max(100, "Position is too long"),
    // File validation happens manually on the server due to FormData complexity
}).strict();

export const ResultSearchSchema = z.object({
    admissionNo: z.string().min(1, "Admission Number is required").max(50).regex(/^[A-Za-z0-9\-]+$/, "Invalid format"),
    dob: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "DOB must be DD-MM-YYYY").max(10),
}).strict();
