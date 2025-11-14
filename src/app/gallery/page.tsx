
import GalleryPageClient from './GalleryPageClient';
import type { Metadata } from 'next';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
    title: 'Gallery',
    description: 'Explore moments of learning, creativity, and joy at SIA Khargone.',
};

export default function GalleryPage() {
  return (
    <div className="pt-[70px]">
        <section className="bg-muted py-12">
            <div className="container mx-auto max-w-7xl px-4 text-center">
                <motion.h1 
                    className="text-4xl font-bold md:text-5xl font-headline"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Our Gallery
                </motion.h1>
                <motion.p 
                    className="mt-2 text-lg text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Explore moments of learning, creativity, and joy at SIA Khargone.
                </motion.p>
            </div>
        </section>
        <GalleryPageClient />
    </div>
  );
}
