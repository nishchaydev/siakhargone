
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/common/Section";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Tag } from "lucide-react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Helper to generate static params if we wanted widely used pages, 
// but we are using dynamic rendering as per user request.

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // We catch potential error if fetch fails
    try {
        const newsRes = await fetchStrapi(`news-items?filters[slug][$eq]=${slug}&populate=*`);
        const item = newsRes?.data?.[0]?.attributes;
        if (!item) return { title: "News Not Found" };

        return {
            title: item.title,
            description: item.summary || item.title,
        };
    } catch (e) {
        return { title: "News" };
    }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const newsRes = await fetchStrapi(`news-items?filters[slug][$eq]=${slug}&populate=deep,10`);
    const item = newsRes?.data?.[0];

    if (!item) {
        return (
            <div className="min-h-screen pt-32 text-center">
                <h1 className="text-2xl font-bold mb-4">News Article Not Found</h1>
                <Button asChild><Link href="/news">Back to News</Link></Button>
            </div>
        );
    }

    const { title, content, date, category, coverImage } = item.attributes;
    const imageUrl = getStrapiMedia(coverImage?.data?.attributes?.url);
    const displayDate = date ? new Date(date).toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
    }) : 'Recent';

    return (
        <article className="min-h-screen bg-grain pt-[70px]">
            {/* Hero / Header */}
            <div className="relative h-[50vh] w-full bg-navy overflow-hidden">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent/50" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 container mx-auto text-white">
                    <div className="flex items-center gap-4 mb-4 text-sm font-medium tracking-wider">
                        <span className="bg-gold text-navy px-3 py-1 rounded-full">{category || "News"}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {displayDate}</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">{title}</h1>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 md:py-20 lg:flex gap-12">
                {/* Main Content */}
                <div className="lg:w-2/3">
                    <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-gold transition-colors">
                        <Link href="/news"><ArrowLeft className="mr-2 h-4 w-4" /> Back to News</Link>
                    </Button>

                    <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-navy prose-p:text-gray-700 prose-img:rounded-xl">
                        {/* Rendering rich text simply */}
                        {content ? (
                            <div className="whitespace-pre-line leading-relaxed">
                                {content}
                            </div>
                        ) : (
                            <p className="italic text-muted-foreground">No content details available.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar / Related (Optional, keeping simple for now) */}
                <div className="hidden lg:block lg:w-1/3">
                    {/* Could list Recent News here if we fetched them */}
                </div>
            </div>
        </article>
    );
}
