
import { Metadata } from "next";
import PageBanner from "@/components/common/PageBanner";
import { Section } from "@/components/common/Section";
import { TourForm } from "@/components/tour/TourForm";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { cloudinary } from "@/lib/cloudinary-images"; // Ensure this is available

export const metadata: Metadata = {
    title: "Schedule a School Tour | Sanskar International Academy",
    description: "Book a personalized campus tour to explore our facilities, meet our faculty, and experience life at SIA.",
};

export default function ScheduleTourPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <PageBanner
                title="Schedule a Visit"
                subtitle="Experience the warmth and vibrancy of our campus firsthand."
                image={cloudinary.infrastructure.building[0]} // Use a nice building shot
            />

            <div className="container mx-auto max-w-6xl px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Context & WhatsApp */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy mb-4">
                                Why Visit <span className="text-gold-accent">SIA?</span>
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Walking through our corridors is the best way to understand if Sanskar International Academy is the right fit for your child.
                                During your visit, you will:
                            </p>
                            <ul className="mt-6 space-y-4">
                                {[
                                    "Explore our smart classrooms and labs.",
                                    "See our sports infrastructure in action.",
                                    "Interact with our academic coordinators.",
                                    "Get answers to all your admission queries."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
                                        <span className="text-navy font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* WhatsApp CTA */}
                        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl font-bold text-green-800 mb-2 flex items-center gap-2">
                                <MessageCircle className="w-6 h-6" /> prefer WhatsApp?
                            </h3>
                            <p className="text-green-700/80 mb-6">
                                You can also schedule your visit directly by chatting with our admissions team on WhatsApp.
                            </p>
                            <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-12 text-lg rounded-xl shadow-md transition-all">
                                <a
                                    href="https://wa.me/919999988888?text=Hi,%20I%20would%20like%20to%20schedule%20a%20campus%20visit%20for%20Grade..."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 w-full justify-center"
                                >
                                    <MessageCircle className="w-5 h-5 fill-current" />
                                    Book via WhatsApp
                                </a>
                            </Button>
                        </div>

                        {/* Contact Info */}
                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-sm font-bold text-navy uppercase tracking-wider mb-2">Admissions Office</p>
                            <p className="text-2xl font-display font-bold text-navy">07049-110104</p>
                            <p className="text-gray-500 text-sm mt-1">Available Mon-Sat, 9:00 AM - 4:00 PM</p>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div>
                        <div className="bg-white p-1 rounded-2xl shadow-xl border border-gray-100">
                            <div className="bg-navy px-6 py-4 rounded-t-xl">
                                <h3 className="text-white font-bold text-lg">Tour Booking Form</h3>
                                <p className="text-white/70 text-sm">Fill in your details to request a slot.</p>
                            </div>
                            <TourForm />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
