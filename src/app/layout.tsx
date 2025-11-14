
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/chatbot/Chatbot';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import MobileCtaBar from '@/components/layout/MobileCtaBar';
import ScrollToTop from '@/components/common/ScrollToTop';
import SignatureBadge from "@/components/common/SignatureBadge";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-playfair-display',
});


const openGraphImage = 'https://firebasestorage.googleapis.com/v0/b/sia-khargone.appspot.com/o/og-banner.png?alt=media';

export const metadata: Metadata = {
  metadataBase: new URL('https://siakhargone.web.app'),
  title: {
    default: 'Sanskar International Academy | Khargone\'s Premier CBSE Institution',
    template: '%s | Sanskar International Academy',
  },
  description: 'Empowering young minds through quality education, values, and global exposure. Explore Sanskar International Academy, Khargone\'s Premier CBSE Institution.',
  keywords: ['Sanskar International Academy', 'Khargone', 'CBSE', 'school', 'education', 'admissions', 'academics', 'international school'],
  authors: [{ name: 'Sanskar International Academy' }],
  openGraph: {
    type: 'website',
    url: 'https://siakhargone.web.app/',
    title: 'Sanskar International Academy',
    description: 'Empowering learners through education, discipline, and innovation.',
    images: [openGraphImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanskar International Academy',
    description: 'Excellence in education. Character in action.',
    images: [openGraphImage],
  },
  alternates: {
    canonical: 'https://siakhargone.web.app/',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SIA Khargone',
  },
  icons: {
    icon: '/logosia.png',
    shortcut: '/logosia.png',
    apple: '/logosia.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfairDisplay.variable} !scroll-smooth`}>
      <head>
          <meta name="theme-color" content="#1E3A8A" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      </head>
      <body className="bg-background text-foreground antialiased">
        <FirebaseClientProvider>
            <ScrollToTop />
            <Header />
            <main className="pt-[114px]">{children}</main>
            <Footer />
            <MobileCtaBar />
            <Chatbot />
            <Toaster />
            <SignatureBadge />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
