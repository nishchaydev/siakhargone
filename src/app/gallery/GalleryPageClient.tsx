
"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { GalleryImage } from "@/lib/definitions";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { X } from "lucide-react";
import { useCollection } from "@/firebase";
import { mockGalleryImages } from "@/data/fallbackData";

export default function GalleryPageClient() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { data: galleryImages, isLoading } = useCollection<GalleryImage>('galleryItems');

  const imagesToShow = isLoading ? [] : (galleryImages || mockGalleryImages);

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div 
            className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            animate="visible"
          >
            {isLoading && imagesToShow.length === 0 ? (
              Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full mb-4 rounded-lg" />
              ))
            ) : (
              imagesToShow.map((image) => (
                <motion.div 
                  key={image.id} 
                  className="mb-4 break-inside-avoid"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  layoutId={`card-${image.id}`}
                >
                  <Card 
                    className="overflow-hidden transition-shadow duration-300 hover:shadow-xl cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <CardContent className="p-0">
                      <motion.div
                        className="relative h-auto w-full aspect-auto"
                        layoutId={`image-${image.id}`}
                      >
                        <Image
                          src={image.imageUrl}
                          alt={image.description || 'Gallery image'}
                          data-ai-hint={image.imageHint}
                          width={400}
                          height={500}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover w-full h-auto"
                        />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full"
              layoutId={`card-${selectedImage.id}`}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
            >
              <motion.div 
                className="relative aspect-video w-full"
                layoutId={`image-${selectedImage.id}`}
              >
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.description || 'Selected gallery image'}
                  fill
                  className="object-contain"
                />
              </motion.div>
              {selectedImage.description && (
                  <motion.p 
                    className="text-white text-center mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedImage.description}
                  </motion.p>
              )}
            </motion.div>
             <motion.button
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                onClick={() => setSelectedImage(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <X size={32} />
              </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
