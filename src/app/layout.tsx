import type { Metadata } from 'next';
import { Inter, Playfair_Display, Mukta } from 'next/font/google';
import './globals.css';
import BackToTop from "@/components/common/BackToTop";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Preloader from "@/components/ui/Preloader";
import { GoogleAnalytics } from '@next/third-parties/google'
import UrgencyBanner from "@/components/common/UrgencyBanner";
import { schoolData } from "@/data/schoolData";

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

const openGraphImage = 'https://res.cloudinary.com/dkits80xk/image/upload/v1765377520/Gemini_Generated_Image_q9u4r1q9u4r1q9u4_ukwf8a.png';

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
        { url: 'https://res.cloudinary.com/dkits80xk/image/upload/w_16,h_16,c_fill/v1768373239/school-logo_npmwwm.png', sizes: '16x16', type: 'image/png' },
        { url: 'https://res.cloudinary.com/dkits80xk/image/upload/w_32,h_32,c_fill/v1768373239/school-logo_npmwwm.png', sizes: '32x32', type: 'image/png' },
        { url: 'https://res.cloudinary.com/dkits80xk/image/upload/w_48,h_48,c_fill/v1768373239/school-logo_npmwwm.png', sizes: '48x48', type: 'image/png' },
      ],
      shortcut: 'https://res.cloudinary.com/dkits80xk/image/upload/v1768373239/school-logo_npmwwm.png',
      apple: [
        { url: 'https://res.cloudinary.com/dkits80xk/image/upload/w_180,h_180,c_fill/v1768373239/school-logo_npmwwm.png', sizes: '180x180', type: 'image/png' },
      ],
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: 'https://res.cloudinary.com/dkits80xk/image/upload/w_180,h_180,c_fill/v1768373239/school-logo_npmwwm.png',
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
        {/* Google Search Console Verification - Replace YOUR_CODE_HERE with actual code */}
        <meta name="google-site-verification" content="YOUR_CODE_HERE" />
        <meta name="theme-color" content="#1E3A8A" />

        {/* DNS Prefetch for Performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      </head>
      <body className="bg-background text-foreground antialiased bg-grain">
        <Preloader />
        <UrgencyBanner />
        {children}
        <BackToTop />
        <Toaster />
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": schoolData.name,
              "alternateName": "SIA Khargone",
              "url": "https://siakhargone.in",
              "logo": "https://res.cloudinary.com/dkits80xk/image/upload/v1768373239/school-logo_npmwwm.png",
              "description": "One of the leading CBSE English-medium schools in Khargone, known for disciplined academics, modern infrastructure, and holistic student development.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": schoolData.contact.address,
                "addressLocality": "Khargone",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "451001",
                "addressCountry": "IN"
              },
              "foundingDate": schoolData.stats.established,
              "knowsAbout": ["CBSE Curriculum", "Holistic Education", "Sports Academy", "Smart Classrooms"],
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
            })
          }}
        />
      </body>
    </html >
  );
}
