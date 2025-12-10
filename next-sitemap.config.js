
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://siakhargone.in",
    generateRobotsTxt: true,
    exclude: [
        "/admin",
        "/admin/*",
        "/admin/login",
        "/admin/dashboard",
    ],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://siakhargone.in/sitemap.xml',
        ],
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/admin/login', '/admin/dashboard'],
            },
        ],
    },
};
