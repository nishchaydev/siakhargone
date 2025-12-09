
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/common/Section";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Tag } from "lucide-react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata = {
    title: "News & Announcements",
    description: "Latest news, updates, and announcements from SIA Khargone.",
};

export default async function NewsPage() {
    const newsRes = await fetchStrapi("news-items", "sort[0]=date:desc&populate=deep,10");
    const newsItems = newsRes?.data || [];

    return (
        <div className="min-h-screen bg-grain pt-[70px]">
            <Section id="news" title="News & Announcements" subtitle="Stay updated with the latest happenings at SIA">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.length === 0 ? (
                        <p className="text-center col-span-full text-muted-foreground">No news posted yet.</p>
                    ) : (
                        newsItems.map((item: any) => {
                            const { title, summary, date, category, slug, coverImage } = item.attributes;
                            const imageUrl = getStrapiMedia(coverImage?.data?.attributes?.url);
                            const displayDate = date ? new Date(date).toLocaleDateString() : 'Recent';

                            return (
                                <Card key={item.id} className="card-premium h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={imageUrl || "https://picsum.photos/800/600"}
                                            alt={title}
                                            fill
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold shadow-md">
                                            {category || "News"}
                                        </div>
                                    </div>
                                    <CardContent className="p-6 flex-grow">
                                        <div className="flex items-center gap-2 text-gold-dark text-xs font-semibold mb-3 uppercase tracking-wide">
                                            <Calendar className="h-4 w-4" />
                                            {displayDate}
                                        </div>
                                        <h3 className="font-display text-xl font-bold text-navy mb-3 line-clamp-2">{title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-3">{summary}</p>
                                    </CardContent>
                                    <CardFooter className="p-6 pt-0">
                                        <Button asChild variant="outline" className="w-full border-gold text-gold-dark hover:bg-gold hover:text-white transition-colors">
                                            <Link href={`/news/${slug || item.id}`}>Read Full Story</Link>
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
