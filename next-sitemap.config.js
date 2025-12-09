/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://siakhargone.in',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://siakhargone.in/server-sitemap.xml',
        ],
    },
    exclude: ['/server-sitemap.xml'],
    generateIndexSitemap: false,
    changefreq: 'monthly',
    priority: 0.7,
    sitemapSize: 5000,
};
