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
        '/mandatory-disclosure',
        '/faq',
        '/why-choose-sia',
        '/blog',
        '/press',
        '/about/achievements',
        '/best-school-in-khargone',
        '/compare',
        '/transportation',
        '/reviews',
        '/admission-guide',
        '/achievements',
        '/updates',
        '/best-cbse-school-in-khargone',
        '/schools-in-khargone-guide',
        '/cbse-admission-in-khargone',
        '/how-to-choose-school-in-khargone'
    ];

    const HIGH_PRIORITY_ROUTES = ['/admissions', '/contact', '/careers', '/academics'];
    const LOW_PRIORITY_ROUTES = ['/privacy', '/terms', '/mandatory-disclosure', '/tc'];

    const isTechnicalRoute = (route: string) => {
        return ['/sitemap.xml', '/robots.txt', '/manifest.webmanifest', '/site.webmanifest'].some(p => route.endsWith(p));
    };

    return routes
        .filter(route => !isTechnicalRoute(route))
        .map((route) => {
            const isHighPriority = HIGH_PRIORITY_ROUTES.includes(route);
            const isLowPriority = LOW_PRIORITY_ROUTES.includes(route);

            let changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'weekly';
            if (route === '' || route === '/notices' || route === '/news-events') changeFrequency = 'daily';
            else if (isLowPriority) changeFrequency = 'monthly';

            return {
                url: `${baseUrl}${route}`,
                lastModified: new Date(),
                changeFrequency,
                priority: route === '' ? 1 : isHighPriority ? 0.9 : isLowPriority ? 0.5 : 0.8,
            };
        });
}
