
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';

import MobileCtaBar from '@/components/layout/MobileCtaBar';
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


const openGraphImage = '/logosia.png';


export const metadata: Metadata = {
  metadataBase: new URL('https://siakhargone.in'),
  title: {
    default: 'Sanskar International Academy | Khargone\'s Premier CBSE School',
    template: '%s | Sanskar International Academy',
  },
  description: 'Join Sanskar International Academy (SIA), Khargone\'s leading CBSE institution offering world-class education, modern facilities, and holistic development for students.',
  keywords: ['Sanskar International Academy', 'SIA Khargone', 'CBSE School Khargone', 'Best School in Khargone', 'International School MP', 'Education', 'Admissions'],
  authors: [{ name: 'Sanskar International Academy' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://siakhargone.in',
    title: 'Sanskar International Academy | Excellence in Education',
    description: 'Empowering young minds through quality education, values, and global exposure at Khargone\'s premier CBSE school.',
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logosia.png',
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
  '@context': 'https://schema.org',
  '@type': 'School',
  name: 'Sanskar International Academy',
  url: 'https://siakhargone.in',
  logo: 'https://siakhargone.in/logosia.png',
  image: 'https://siakhargone.in/logosia.png',
  description: 'Premier CBSE school of Khargone offering holistic education and state-of-the-art facilities.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'SIA Campus',
    addressLocality: 'Khargone',
    addressRegion: 'Madhya Pradesh',
    postalCode: '451001',
    addressCountry: 'IN'
  },
  telephone: '+917049110104',
  sameAs: [
    'https://www.facebook.com/siakhargone/',
    'https://www.instagram.com/sanskarinternationalacademy/',
    'https://www.youtube.com/channel/UCZJ-rKvV_Ln5qWgJs0iBnEw'
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
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
