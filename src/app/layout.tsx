import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Mukta } from 'next/font/google';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1E3A8A',
};
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

import { schoolData } from "@/data/schoolData";
import Script from 'next/script';
import UrgencyBanner from "@/components/common/UrgencyBanner";
import { GoogleTagManager } from '@next/third-parties/google'


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-playfair-display',
});

const mukta = Mukta({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-mukta',
});

const openGraphImage = 'https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto/v1770822827/SANSKAR_BULING_copy.jpg_m6avnd.jpg';

export function generateMetadata(): Metadata {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const admissionYear = `${currentYear}-${String(nextYear).slice(-2)}`;

  return {
    metadataBase: new URL('https://siakhargone.in'),
    title: {
      default: `Best CBSE School in Khargone | Sanskar International Academy | Admissions ${admissionYear}`,
      template: '%s | Sanskar International Academy',
    },
    description: `Admissions Open ${admissionYear} | Sanskar International Academy, Khargone. CBSE Affiliated (1031345). Nominal Fees, Expert Faculty, & Best-in-Class Sports Facilities. Apply Now for a holistic education.`,
    keywords: ['best school in Khargone', 'CBSE school Khargone', 'top school Khargone', 'English medium school Khargone', 'Sanskar International Academy', 'SIA Khargone', `school admission Khargone ${currentYear}`, 'CBSE Affiliation 1031345', 'top schools in khargone reviews', 'khargone school ratings', 'well known schools khargone', 'Smart Classrooms Khargone', 'Digital Learning School', 'AI Integrated Curriculum'],
    authors: [{ name: 'Sanskar International Academy' }],
    alternates: {
      canonical: 'https://siakhargone.in/',
    },
    manifest: '/favicon/site.webmanifest',
    openGraph: {
      type: 'website',
      url: 'https://siakhargone.in/',
      title: `Best CBSE School in Khargone | Sanskar International Academy | Admissions ${admissionYear}`,
      description: `Sanskar International Academy - Top rated CBSE school in Khargone with 1100+ students, 50+ teachers, modern infrastructure. English-medium education from nursery to class 12. Admissions open ${admissionYear}. Visit our Khandwa Road campus.`,
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
      site: '@siakhargone', // Added generic handle
      creator: '@siakhargone',
    },
    category: 'education', // Added category
    classification: 'School', // Added classification
    icons: {
      icon: [
        { url: 'https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto,w_16,h_16,c_fill/v1768373239/school-logo_npmwwm.png', sizes: '16x16', type: 'image/png' },
        { url: 'https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto,w_32,h_32,c_fill/v1768373239/school-logo_npmwwm.png', sizes: '32x32', type: 'image/png' },
        { url: 'https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto,w_48,h_48,c_fill/v1768373239/school-logo_npmwwm.png', sizes: '48x48', type: 'image/png' },
      ],
      shortcut: 'https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto,w_32,h_32,c_fill/v1768373239/school-logo_npmwwm.png',
      apple: [
        { url: 'https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto,w_180,h_180,c_fill/v1768373239/school-logo_npmwwm.png', sizes: '180x180', type: 'image/png' },
      ],
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: 'https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto,w_180,h_180,c_fill/v1768373239/school-logo_npmwwm.png',
      },
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfairDisplay.variable} ${mukta.variable} !scroll-smooth`}>
      <head>

        {/* DNS Prefetch for Performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <GoogleTagManager gtmId="GTM-NMCF4P4" />
      </head>

      <body className="bg-background text-foreground antialiased bg-grain">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NMCF4P4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>


        <UrgencyBanner />
        {children}
        <Toaster />
        <SpeedInsights />
        <Analytics />
        {/* GA4 is handled via GTM container (GTM-NMCF4P4) — no separate gtag needed */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "School",
              "@id": "https://siakhargone.in/#school",
              "name": "Sanskar International Academy",
              "alternateName": ["SIA Khargone", "SIA", "Sanskar International Academy Khargone"],
              "url": "https://siakhargone.in",
              "logo": {
                "@type": "ImageObject",
                "url": "https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto,w_200/v1768373239/school-logo_npmwwm.png",
                "width": 200,
                "height": 200
              },
              "image": [
                "https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto/v1770822827/SANSKAR_BULING_copy.jpg_m6avnd.jpg",
                "https://res.cloudinary.com/dkits80xk/image/upload/f_auto,q_auto,c_scale,w_1920/v1765349456/infrastructure-building-1_gstqrx.webp"
              ],
              "description": "Sanskar International Academy (SIA) is one of the best CBSE English-medium schools in Khargone, Madhya Pradesh. Established in 2016, CBSE Affiliation No: 1031345. Offering education from Nursery to Class 12 with 1100+ students, 50+ teachers, modern smart classrooms, and comprehensive sports facilities on a 5-acre campus.",
              "slogan": "विद्या ददाति विनयम् — Education bestows humility",
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
                "latitude": 21.82520,
                "longitude": 75.61450
              },
              "hasMap": schoolData.contact.googleMapLink,
              "foundingDate": "2016",
              "numberOfStudents": 1100,
              "numberOfEmployees": 50,
              "educationalLevel": ["Nursery", "Kindergarten", "Primary School", "Middle School", "Secondary School", "Senior Secondary School"],
              "knowsAbout": ["CBSE Curriculum", "NEP 2020", "English Medium Education", "Holistic Education", "Sports Academy", "Smart Classrooms", "AI Integrated Curriculum", "Digital Learning", "Competitive Exam Preparation"],
              "knowsLanguage": ["en", "hi"],
              "telephone": "+917049110104",
              "email": schoolData.contact.email,
              "priceRange": "₹₹",
              "currenciesAccepted": "INR",
              "paymentAccepted": "Cash, Bank Transfer, Online Payment",
              "areaServed": {
                "@type": "City",
                "name": "Khargone",
                "containedInPlace": {
                  "@type": "State",
                  "name": "Madhya Pradesh",
                  "containedInPlace": {
                    "@type": "Country",
                    "name": "India"
                  }
                }
              },
              "parentOrganization": {
                "@type": "Organization",
                "name": "M/S Mahamana Markandey Education and Social Development Society",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Village Post Badgaon, Tehsil Gogawan",
                  "addressLocality": "Khargone",
                  "addressRegion": "Madhya Pradesh",
                  "postalCode": "451001",
                  "addressCountry": "IN"
                }
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+917049110104",
                  "contactType": "admissions",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+917049110104",
                  "contactType": "customer service",
                  "areaServed": "IN",
                  "availableLanguage": ["English", "Hindi"]
                }
              ],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "16:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Saturday",
                  "opens": "08:00",
                  "closes": "13:00"
                }
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "CBSE Affiliation",
                "recognizedBy": {
                  "@type": "Organization",
                  "name": "Central Board of Secondary Education",
                  "alternateName": "CBSE",
                  "url": "https://www.cbse.gov.in"
                }
              },
              "award": ["District Taekwondo Champions", "Featured in Dainik Bhaskar", "50+ Awards in Academics and Sports"],
              "sameAs": [
                schoolData.social.facebook,
                schoolData.social.instagram,
                schoolData.social.youtube
              ]
            })
          }}
        />
      </body>
    </html >
  );
}
