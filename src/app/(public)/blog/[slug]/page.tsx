import { blogPosts } from "@/data/blogPosts";
import PageBanner from "@/components/common/PageBanner";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | SIA Khargone Blog`,
        description: post.excerpt,
        openGraph: {
            images: [post.coverImage],
        },
    };
}

// Generate Static Params for SSG (Optional but good for performance)
export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-grain">
            <PageBanner
                title="SIA Insights"
                subtitle="Our Latest Articles"
                image={post.coverImage}
            />

            <section className="section-xl bg-white">
                <article className="container max-w-4xl mx-auto px-6">
                    <div className="mb-8 border-b pb-8">
                        <h1 className="text-3xl md:text-5xl font-display font-bold text-navy mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-muted-foreground text-sm">
                            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span>•</span>
                            <span>By SIA Editorial Team</span>
                        </div>
                    </div>

                    <div
                        className="prose prose-lg prose-navy max-w-none 
                        prose-headings:font-display prose-headings:font-bold prose-headings:text-navy
                        prose-a:text-gold-dark prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl prose-img:shadow-lg"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-16 pt-10 border-t border-gray-200">
                        <div className="bg-navy p-8 rounded-2xl text-center text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-4">Looking for the Best School in Khargone?</h3>
                                <p className="text-white/80 mb-6 max-w-xl mx-auto">
                                    Join Sanskar International Academy and give your child the gift of holistic education.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Button asChild className="bg-gold text-navy hover:bg-white">
                                        <Link href="/admissions">Apply Now</Link>
                                    </Button>
                                    <Button asChild variant="outline" className="bg-white border-white text-navy hover:bg-gold hover:border-gold hover:text-navy">
                                        <Link href="/contact">Contact Us</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}
