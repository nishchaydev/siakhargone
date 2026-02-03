import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin-school-portal/', '/api/admin/'], // Hide Admin pages
        },
        sitemap: 'https://siakhargone.in/sitemap.xml',
    };
}
