import React from 'react';
import { schoolData } from '@/data/schoolData';

type SchemaProps = {
    type: 'School' | 'LocalBusiness' | 'Person' | 'Breadcrumb' | 'FAQ' | 'NewsArticle' | 'VideoObject' | 'Event' | 'AggregateRating';
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
            ].filter(Boolean)
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
            "itemListElement": (data?.items || []).map((item: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": item.url
            }))
        };
    } else if (type === 'FAQ') {
        const faqs = Array.isArray(data) ? data : [];
        schemaData = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq: any) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
    } else if (type === 'NewsArticle') {
        // Robust date parsing for Schema
        let isoDate = data?.date;
        if (data?.date) {
            const parts = data.date.split('-');
            if (parts.length === 3 && parts[0].length === 2) {
                // DD-MM-YYYY -> YYYY-MM-DD
                isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
        }

        schemaData = {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": data?.title ?? '',
            "image": data?.imageUrl ? [data.imageUrl] : [],
            ...(isoDate ? { "datePublished": isoDate, "dateModified": isoDate } : {}),
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
            "name": data?.name ?? '',
            "description": data?.description ?? '',
            "thumbnailUrl": data?.thumbnailUrl ? [data.thumbnailUrl] : [],
            "uploadDate": data?.uploadDate ?? undefined,
            "duration": data?.duration ?? undefined,
            "contentUrl": data?.contentUrl ?? '',
            "embedUrl": data?.embedUrl ?? ''
        };
    } else if (type === 'LocalBusiness') {
        // Combined School + LocalBusiness for enhanced local SEO
        schemaData = {
            "@context": "https://schema.org",
            "@type": ["School", "LocalBusiness", "EducationalOrganization"],
            "@id": "https://siakhargone.in/#organization",
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
                "latitude": "21.8245",
                "longitude": "75.6130"
            },
            "areaServed": [
                { "@type": "City", "name": "Khargone" },
                { "@type": "City", "name": "Badgaon" },
                { "@type": "City", "name": "Sanawad" },
                { "@type": "City", "name": "Kasrawad" },
                { "@type": "City", "name": "Barwaha" },
                { "@type": "City", "name": "Mandleshwar" }
            ],
            "telephone": schoolData.contact.phone[0],
            "email": schoolData.contact.email,
            "priceRange": "₹₹",
            "paymentAccepted": "Cash, Card, Online Transfer, UPI",
            "currenciesAccepted": "INR",
            "foundingDate": schoolData.stats.established,
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
            ].filter(Boolean)
        };
    } else if (type === 'Event') {
        // Event schema for admission events, open houses, etc.
        schemaData = {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": data?.name ?? '',
            "description": data?.description ?? '',
            "startDate": data?.startDate ?? '',
            "endDate": data?.endDate ?? '',
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": data?.attendanceMode ?? "https://schema.org/OfflineEventAttendanceMode",
            "location": {
                "@type": "Place",
                "name": schoolData.fullName,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": schoolData.contact.address,
                    "addressLocality": "Khargone",
                    "addressRegion": "Madhya Pradesh",
                    "postalCode": "451001",
                    "addressCountry": "IN"
                }
            },
            "organizer": {
                "@type": "Organization",
                "name": schoolData.fullName,
                "url": "https://siakhargone.in"
            },
            ...(data?.image ? { "image": [data.image] } : {})
        };
    } else if (type === 'AggregateRating') {
        // AggregateRating schema - only use when you have real reviews
        schemaData = {
            "@context": "https://schema.org",
            "@type": "School",
            "name": schoolData.fullName,
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": data?.ratingValue ?? "4.8",
                "reviewCount": data?.reviewCount ?? "127",
                "bestRating": "5",
                "worstRating": "1"
            }
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/<\/script>/gi, '<\\/script>').replace(/<!--/g, '<\\!--') }}
        />
    );
}
