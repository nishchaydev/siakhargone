import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function EventDetailPage({ params }: PageProps) {
    const { slug } = await params;

    const res = await fetchStrapi("events", `filters[slug][$eq]=${slug}&populate=deep,10`);
    const event = res?.data?.[0]?.attributes;

    if (!event) {
        return <div className="p-10">Event not found.</div>;
    }

    const coverImage = event.coverImage?.data
        ? getStrapiMedia(event.coverImage.data.attributes.url)
        : null;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold">{event.title}</h1>
            <p className="text-muted-foreground mt-2">{event.date}</p>

            {coverImage && (
                <img
                    src={coverImage}
                    alt={event.title}
                    className="w-full rounded-lg my-6"
                />
            )}

            <div className="prose max-w-none">
                {event.description}
            </div>
        </div>
    );
}
