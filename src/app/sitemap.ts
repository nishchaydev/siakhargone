import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://siakhargone.in'; // Production URL

    // Core Pages
    const routes = [
        '',
        '/about/overview',
        '/about/vision',
        '/about/principal',
        '/about/management',
        '/academics',
        '/academics/faculty',
        '/admissions',
        '/beyond-academics',
        '/life-at-sia',
        '/contact',
        '/downloads',
        '/gallery',
        '/notices',
        '/careers',
        '/tc',
        '/news-events',
        '/results',
        '/fees',
        '/virtual-tour',
        '/privacy',
        '/terms',
        '/mandatory-disclosure'
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));
}
