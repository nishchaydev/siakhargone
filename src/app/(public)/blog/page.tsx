import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blogPosts";
import PageBanner from "@/components/common/PageBanner";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Latest News & Articles | Best School in Khargone | SIA Blog",
    description: "Read expert insights on education, parenting, and school life from Sanskar International Academy, the best CBSE school in Khargone.",
};

export default function BlogIndexPage() {
    return (
        <div className="min-h-screen bg-grain">
            <PageBanner
                title="SIA Insights"
                subtitle="Expert Guidance on Education & Parenting"
                image="https://res.cloudinary.com/dkits80xk/image/upload/v1768373239/school-logo_npmwwm.png"
            />

            <section className="section-xl bg-white">
                <div className="container max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.length > 0 ? (
                            blogPosts.map((post) => (
                                <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col h-full border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div className="absolute top-4 left-4 bg-gold text-navy font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                                            Article
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col bg-white">
                                        <p className="text-sm text-muted-foreground mb-3">{(() => {
                                            if (!post.date) return "";
                                            const d = new Date(post.date);
                                            return isNaN(d.getTime()) ? "Unknown Date" : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                                        })()}</p>
                                        <h2 className="text-xl font-display font-bold text-navy mb-3 group-hover:text-gold-dark transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <span className="text-gold-dark font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More →
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                <div className="max-w-md mx-auto">
                                    <h3 className="text-2xl font-display font-bold text-navy mb-3">No Articles Found</h3>
                                    <p className="text-muted-foreground mb-8">We are currently curating new insights and stories. Please check back soon for updates.</p>
                                    <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-navy bg-gold hover:bg-gold-dark transition-colors shadow-lg">
                                        Return to Home
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
