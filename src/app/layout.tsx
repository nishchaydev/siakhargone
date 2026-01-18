
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Mukta } from 'next/font/google';
import './globals.css';
import BackToTop from "@/components/common/BackToTop";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'
import Preloader from "@/components/ui/Preloader";

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
    url: 'https://siakhargone.in/',
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
  other: {
    organization: 'Sanskar International Academy',
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
        <Preloader />
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
              "name": "Sanskar International Academy",
              "url": "https://siakhargone.in",
              "logo": "https://res.cloudinary.com/dkits80xk/image/upload/v1768373239/school-logo_npmwwm.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9644004990",
                "contactType": "admissions",
                "areaServed": "IN",
                "availableLanguage": ["en", "hi"]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Khandwa Road",
                "addressLocality": "Khargone",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "451001",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://www.facebook.com/people/Sanskar-International-Academy/61556184519960/",
                "https://www.instagram.com/sanskar_international_academy/",
                "https://www.youtube.com/channel/UCZJ-rKvV_Ln5qWgJs0iBnEw"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
