
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://siakhargone.vercel.app';

    // Core pages
    const routes = [
        '',
        '/about',
        '/academics',
        '/life-at-sia',
        '/beyond-school',
        '/admissions',
        '/contact',
        '/gallery',
        '/mandatory-disclosure',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
