import { Metadata } from "next";
import PageBanner from "@/components/common/PageBanner";
import { Section } from "@/components/common/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { NoticeBoard } from "@/components/notices/NoticeBoard";
import { cloudinary } from "@/lib/cloudinary-images";

export const metadata: Metadata = {
    title: "News & Events | Sanskar International Academy",
    description: "Stay updated with the latest news, upcoming events, and gallery highlights from SIA.",
};

const upcomingEvents = [
    {
        id: 1,
        title: "Annual Sports Meet 2026",
        date: "2026-02-15",
        time: "09:00 AM",
        location: "School Sports Ground",
        description: "Join us for a day of athletic excellence and team spirit as our students compete in various sports events.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Science Exhibition",
        date: "2026-02-28",
        time: "10:30 AM",
        location: "Main Auditorium",
        description: "Witness the innovative projects and scientific models created by our young scientists.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Holi Celebration",
        date: "2026-03-04",
        time: "11:00 AM",
        location: "School Campus",
        description: "A colorful celebration of the festival of Holi with organic colors and cultural performances.",
        image: "https://images.unsplash.com/photo-1543355209-4081c70c1a92?q=80&w=2070&auto=format&fit=crop"
    }
];

const newsItems = [
    {
        id: 1,
        title: "SIA Students Shine in District Debate Competition",
        date: "2026-01-10",
        category: "Achievement",
        excerpt: "Our students secured the first position in the Inter-School District Debate Competition held last week.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "New Computer Lab Inauguration",
        date: "2026-01-05",
        category: "Infrastructure",
        excerpt: "We are proud to announce the opening of our state-of-the-art computer lab equipped with the latest technology.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Workshop on Mental Health & Well-being",
        date: "2025-12-20",
        category: "Workshop",
        excerpt: "A successful workshop was conducted for students of grades 9-12 focusing on stress management and mental well-being.",
        image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=2069&auto=format&fit=crop"
    }
];

export default function NewsEventsPage() {
    return (
        <div className="bg-grain min-h-screen">
            <PageBanner
                title="News & Events"
                subtitle="Celebrating our stories, achievements, and upcoming moments."
                image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop"
            />

            {/* Latest News Section */}
            <Section id="news" title="Latest News" subtitle="Happenings around the campus">
                <div className="grid md:grid-cols-3 gap-8">
                    {newsItems.map((news) => (
                        <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md group">
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={news.image}
                                    alt={news.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4">
                                    <Badge className="bg-white/90 text-navy hover:bg-white">{news.category}</Badge>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                                    <Calendar size={14} /> {news.date}
                                </p>
                                <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                                    {news.title}
                                </h3>
                                <p className="text-gray-600 line-clamp-3 mb-4">
                                    {news.excerpt}
                                </p>
                                <Button variant="link" className="p-0 h-auto text-navy font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                    Read More <ArrowRight size={14} />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Notice Board Section */}
            <Section id="notices" title="Notice Board" subtitle="Official circulars and announcements" bgColor="bg-cream">
                <div className="max-w-5xl mx-auto">
                    <NoticeBoard />
                </div>
            </Section>

            {/* Upcoming Events Section */}
            <Section id="events" title="Upcoming Events" subtitle="Mark your calendars">
                <div className="space-y-6 max-w-5xl mx-auto">
                    {upcomingEvents.map((event) => (
                        <Card key={event.id} className="overflow-hidden border-l-4 border-l-gold hover:shadow-md transition-all">
                            <div className="flex flex-col md:flex-row">
                                {/* Date Box */}
                                <div className="bg-navy text-white p-6 flex flex-col items-center justify-center min-w-[120px] shrink-0 text-center">
                                    <span className="text-3xl font-bold font-display">{event.date.split('-')[2]}</span>
                                    <span className="text-sm uppercase tracking-wider opacity-80"> Feb 2026</span>
                                    {/* Simplified date parsing for demo */}
                                </div>

                                {/* Image (Hidden on small mobile) */}
                                <div className="relative h-48 w-full md:w-64 shrink-0 hidden sm:block">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold text-navy mb-2">{event.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1"><MapPin size={14} className="text-gold" /> {event.location}</span>
                                        <span className="flex items-center gap-1"><Calendar size={14} className="text-gold" /> {event.time}</span>
                                    </div>
                                    <p className="text-gray-600">{event.description}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            {/* Gallery Preview Section */}
            <Section id="gallery" title="Campus Life" subtitle="Glimpses of life at SIA" bgColor="bg-white">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Using some placeholder images or cloudinary if available */}
                    {[
                        cloudinary.infrastructure.others[4], // Ground
                        cloudinary.annualFunction[0],      // Function
                        cloudinary.sportsAchievements[2],  // Sports
                        cloudinary.lab.physics[0]          // Lab
                    ].map((src, i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                            <Image
                                src={src}
                                alt="Campus Life"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ImageIcon className="text-white w-8 h-8" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Button asChild size="lg" className="bg-navy hover:bg-navy-dark text-white">
                        <Link href="/gallery">View Full Gallery</Link>
                    </Button>
                </div>
            </Section>
        </div>
    );
}
