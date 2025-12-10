"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import { X, Search } from "lucide-react";

// Types
import { GalleryImage } from "@/lib/definitions";

// Extend GalleryImage to support category if mapped, or we default to 'All'
// We will assume the API maps 'description' or 'imageHint' to category, 
// or we will infer it. Given the current Strapi setup, 'description' was mapped to 'albumName'.
// So we can use 'description' as the Category.

interface GalleryPageClientProps {
  initialImages?: GalleryImage[];
}

const CATEGORIES = ["All", "Campus", "Classrooms", "Labs & Facilities", "Sports", "Events", "Celebrations"];

export default function GalleryPageClient({ initialImages = [] }: GalleryPageClientProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter logic
  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return initialImages;
    // We assume 'description' holds the Album Name (Category) based on previous mapping
    return initialImages.filter(img =>
      img.description?.toLowerCase().includes(activeCategory.toLowerCase()) ||
      img.imageHint?.toLowerCase().includes(activeCategory.toLowerCase())
    );
  }, [activeCategory, initialImages]);

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-navy/50 z-10" />
        {/* Placeholder Hero Image - using the school image if available or a generic one */}
        <Image src="/siakhargone-content/album/photo-for-uploads/infrastructure-photos/building-photos/building-photos-2.webp"
          alt="School Gallery Hero"
          fill
          className="absolute inset-0 object-cover" unoptimized />
        <div className="relative z-20 px-4">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">School Gallery</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Explore campus life, events, facilities, and the vibrant moments that define Sanskar International Academy.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-10 container mx-auto px-4 sticky top-[70px] z-30 bg-white/95 backdrop-blur shadow-sm">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                ? "bg-navy text-white shadow-md transform scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 container mx-auto px-4">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p>No photos found in this category.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image) => (
                <motion.div
                  layout
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image src={image.imageUrl}
                    alt={image.description || "Gallery Image"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110" unoptimized />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-gold-accent/90 text-white p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Search size={24} />
                      <span className="sr-only">View</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Load More Button (Mock) */}
        <div className="text-center mt-12">
          <button className="bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-navy-dark transition-colors flex items-center mx-auto gap-2">
            Load More Photos
            <span className="text-xl">↓</span>
          </button>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-gold-accent transition-colors">
              <X size={32} />
            </button>
            <motion.div
              layoutId={`image-${selectedImage.id}`} // Optional layoutId if mapped correctly
              className="relative max-w-5xl w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImage.imageUrl}
                alt={selectedImage.description || "Selected"}
                fill
                className="object-contain" unoptimized />
              {selectedImage.description && (
                <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 p-2 rounded">
                  {selectedImage.description}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
