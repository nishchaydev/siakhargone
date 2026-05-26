import { Metadata } from "next";
import FeedbackPageClient from "./FeedbackPageClient";

export const metadata: Metadata = {
    title: "Feedback | Sanskar International Academy",
    description: "Share your feedback, suggestions, or concerns with Sanskar International Academy.",
};

export default function FeedbackPage() {
    return <FeedbackPageClient />;
}
