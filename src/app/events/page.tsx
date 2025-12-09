
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/common/Section";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata = {
    title: "Events",
    description: "Upcoming and past events at SIA Khargone.",
};

export default async function EventsPage() {
    const eventsRes = await fetchStrapi("events", "sort[0]=date:desc&populate=deep,10");
    const events = eventsRes?.data || [];

    return (
        <div className="min-h-screen bg-grain pt-[70px]">
            <Section id="events" title="Events & Gallery" subtitle="Moments to Remember">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.length === 0 ? (
                        <p className="text-center col-span-full text-muted-foreground">No events found.</p>
                    ) : (
                        events.map((item: any) => {
                            const { title, description, date, location, slug, coverImage } = item.attributes;
                            const imageUrl = getStrapiMedia(coverImage?.data?.attributes?.url);
                            const displayDate = date ? new Date(date).toLocaleDateString() : 'TBA';
                            // Plain text extraction from rich text if needed for summary, or just use description if simple
                            // Assuming description is richtext, we might not render it here directly or just a snippet if possible.
                            // For card view, we skip rich text or use a truncated version if we can parse it, but standard is just Title/Date/Loc

                            return (
                                <Card key={item.id} className="card-premium h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="relative h-56 w-full overflow-hidden">
                                        <Image
                                            src={imageUrl || "https://picsum.photos/seed/event/800/600"}
                                            alt={title}
                                            fill
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                            <div className="flex items-center gap-2 text-white text-sm font-semibold">
                                                <Calendar className="h-4 w-4 text-gold" />
                                                {displayDate}
                                            </div>
                                        </div>
                                    </div>
                                    <CardContent className="p-6 flex-grow">
                                        <h3 className="font-display text-xl font-bold text-navy mb-2">{title}</h3>
                                        {location && (
                                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                                                <MapPin className="h-4 w-4" />
                                                {location}
                                            </div>
                                        )}
                                    </CardContent>
                                    <CardFooter className="p-6 pt-0">
                                        <Button asChild className="w-full bg-navy text-white hover:bg-gold hover:text-navy-dark transition-colors">
                                            <Link href={`/events/${slug || item.id}`}>View Gallery</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })
                    )}
                </div>
            </Section>
        </div>
    );
}
