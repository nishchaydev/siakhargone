import React from 'react';
import { schoolData } from '@/data/schoolData';

type SchemaProps = {
    type: 'School' | 'Person' | 'Breadcrumb' | 'FAQ' | 'Article' | 'Event' | 'NewsArticle' | 'VideoObject';
    data?: any;
};

export default function Schema({ type, data }: SchemaProps) {
    let schemaData = {};

    if (type === 'School') {
        schemaData = {
            "@context": "https://schema.org",
            "@type": "School",
            "name": schoolData.fullName,
            "alternateName": schoolData.name,
            "url": "https://siakhargone.in",
            "logo": "https://res.cloudinary.com/dkits80xk/image/upload/v1768373239/school-logo_npmwwm.png",
            "image": [
                "https://res.cloudinary.com/dkits80xk/image/upload/v1765377520/Gemini_Generated_Image_q9u4r1q9u4r1q9u4_ukwf8a.png"
            ],
            "description": "One of the leading CBSE English-medium schools in Khargone, known for disciplined academics, modern infrastructure, and holistic student development.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": schoolData.contact.address,
                "addressLocality": "Khargone",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "451001",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": "21.8156",
                "longitude": "75.6200"
            },
            "telephone": schoolData.contact.phone[0],
            "email": schoolData.contact.email,
            "priceRange": "₹₹",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": schoolData.contact.phone[1] || schoolData.contact.phone[0],
                "contactType": "admissions",
                "areaServed": "IN",
                "availableLanguage": ["en", "hi"]
            },
            "sameAs": [
                schoolData.social.facebook,
                schoolData.social.instagram,
                schoolData.social.youtube
            ]
        };
    } else if (type === 'Person') {
        // Principal Schema
        schemaData = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": data?.name || "Mr. Shivam Jaiswal",
            "jobTitle": "Principal",
            "worksFor": {
                "@type": "School",
                "name": "Sanskar International Academy"
            },
            "image": data?.image,
            "description": data?.description || "Principal of Sanskar International Academy, dedicated to fostering holistic education."
        };
    } else if (type === 'Breadcrumb') {
        schemaData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": data?.items.map((item: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }))
        };
    } else if (type === 'FAQ') {
        schemaData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": data?.map((faq: any) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
    } else if (type === 'NewsArticle') {
        schemaData = {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": data.title,
            "image": [data.imageUrl],
            "datePublished": data.date,
            "dateModified": data.date,
            "author": [{
                "@type": "Organization",
                "name": "Sanskar International Academy",
                "url": "https://siakhargone.in"
            }]
        };
    } else if (type === 'VideoObject') {
        schemaData = {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": data.name,
            "description": data.description,
            "thumbnailUrl": [data.thumbnailUrl],
            "uploadDate": data.uploadDate,
            "contentUrl": data.contentUrl,
            "embedUrl": data.embedUrl
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
}
