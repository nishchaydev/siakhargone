import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin-school-portal/', '/api/admin/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                crawlDelay: 0,
            },
            // AI Search Crawlers — ALLOW for AI visibility (ChatGPT, Perplexity, Claude)
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/admin-school-portal/', '/api/admin/'],
            },
            {
                userAgent: 'OAI-SearchBot',
                allow: '/',
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                userAgent: 'ClaudeBot',
                allow: '/',
            },
            {
                userAgent: 'PerplexityBot',
                allow: '/',
            },
            {
                userAgent: 'anthropic-ai',
                allow: '/',
            },
            // AI Training Crawlers — BLOCK (prevent unauthorized training use)
            {
                userAgent: 'CCBot',
                disallow: '/',
            },
            {
                userAgent: 'Bytespider',
                disallow: '/',
            },
            {
                userAgent: 'Google-Extended',
                disallow: '/',
            },
        ],
        sitemap: 'https://siakhargone.in/sitemap.xml',
    };
}
