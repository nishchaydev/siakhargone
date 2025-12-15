
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';

import MobileCtaBar from '@/components/layout/MobileCtaBar';
import FloatingActionMenu from '@/components/layout/FloatingActionMenu';
import ScrollToTop from '@/components/common/ScrollToTop';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'], // Added weights
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Added 600
  display: 'swap',
  variable: '--font-playfair-display',
});

import { Mukta } from 'next/font/google'; // Import Mukta

const mukta = Mukta({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-mukta',
});


const openGraphImage = 'https://res.cloudinary.com/dkits80xk/image/upload/v1765377520/Gemini_Generated_Image_q9u4r1q9u4r1q9u4_ukwf8a.png';


export const metadata: Metadata = {
  metadataBase: new URL('https://siakhargone.in'),
  title: {
    default: 'Sanskar International Academy – Best CBSE School in Khandwa Road, Khargone',
    template: '%s | Sanskar International Academy',
  },
  description: 'One of Khargone\'s top CBSE schools offering modern education, sports, arts, and academics for holistic child development.',
  keywords: ['Sanskar International Academy', 'SIA Khargone', 'CBSE School Khargone', 'Best School in Khargone', 'International School MP', 'Education', 'Admissions'],
  authors: [{ name: 'Sanskar International Academy' }],
  alternates: {
    canonical: 'https://siakhargone.in/',
  },
  openGraph: {
    type: 'website',
    url: 'https://siakhargone.in',
    title: 'Sanskar International Academy – Best CBSE School in Khandwa Road, Khargone',
    description: 'One of Khargone\'s top CBSE schools offering modern education, sports, arts, and academics for holistic child development.',
    siteName: 'Sanskar International Academy',
    images: [{
      url: openGraphImage,
      width: 1200,
      height: 630,
      alt: 'Sanskar International Academy Campus',
    }],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanskar International Academy',
    description: 'Khargone\'s Premier CBSE School. Admissions Open.',
    images: [openGraphImage],
  },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "School",
      "@id": "https://siakhargone.in/#school",
      "name": "Sanskar International Academy",
      "url": "https://siakhargone.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://siakhargone.in/school-logo.png"
      },
      "image": "https://siakhargone.in/school-logo.png",
      "description": "Sanskar International Academy, Khargone — a premier CBSE school offering holistic education, academic excellence, and values-driven learning.",
      "telephone": "+91 70491 10105",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gowadi Fata , Khargone - Khandwa Hwy,Badgaon [Nagjhiri]",
        "addressLocality": "Khargone",
        "postalCode": "451001",
        "addressRegion": "Madhya Pradesh",
        "addressCountry": "IN"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "124",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://www.facebook.com/siakhargone/",
        "https://www.instagram.com/sanskarinternationalacademy/?hl=en",
        "https://www.youtube.com/channel/UCZJ-rKvV_Ln5qWgJs0iBnEw"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://siakhargone.in/#organization",
      "url": "https://siakhargone.in",
      "logo": "https://siakhargone.in/school-logo.png",
      "sameAs": [
        "https://www.facebook.com/siakhargone/",
        "https://www.instagram.com/sanskarinternationalacademy/",
        "https://www.youtube.com/channel/UCZJ-rKvV_Ln5qWgJs0iBnEw"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://siakhargone.in/#website",
      "url": "https://siakhargone.in",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://siakhargone.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://siakhargone.in/"
      }]
    }
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfairDisplay.variable} ${mukta.variable} !scroll-smooth`}>
      <head>
        <meta name="theme-color" content="#1E3A8A" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      </head>
      <body className="bg-background text-foreground antialiased bg-grain">
        <ScrollToTop />
        <Header />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <main className="pt-[114px]">{children}</main>
        <Footer />
        <MobileCtaBar />
        <Chatbot />
        <FloatingActionMenu />
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
