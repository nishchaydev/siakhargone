"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";
import { X, Search, ChevronDown } from "lucide-react";
import { cloudinary } from "@/lib/cloudinary-images";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Types
import { GalleryImage } from "@/lib/definitions";

interface GalleryPageClientProps {
  initialImages?: GalleryImage[];
}

const CATEGORIES = ["All", "Campus", "Classrooms", "Labs & Facilities", "Sports", "Events", "Celebrations"];

export default function GalleryPageClient({ initialImages = [] }: GalleryPageClientProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isHidden, setIsHidden] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Handle ESC key to close lightbox
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  // Filter logic
  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return initialImages;
    return initialImages.filter(img =>
      img.description?.toLowerCase().includes(activeCategory.toLowerCase()) ||
      img.imageHint?.toLowerCase().includes(activeCategory.toLowerCase())
    );
  }, [activeCategory, initialImages]);

  const visibleImages = useMemo(() => {
    return filteredImages.slice(0, visibleCount);
  }, [filteredImages, visibleCount]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(12);
    setIsLoadingMore(false);
  }, [activeCategory]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate network delay
    timeoutRef.current = setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setIsLoadingMore(false);
    }, 800);
  };

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-gold selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-background z-10" />
        <Image
          src={cloudinary.infrastructure.building[1]}
          alt="School Gallery Hero"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover scale-105"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 px-4 container mx-auto"
        >
          <span className="text-gold font-bold tracking-[0.3em] text-sm uppercase mb-4 block">PICTORIAL JOURNEY</span>
          <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            SIA <span className="text-gold">Gallery</span>
          </h1>
          <p className="text-white/90 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
            Every snapshot tells a story of excellence, growth, and vibrant campus life.
          </p>
        </motion.div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="text-white/50 w-8 h-8" aria-hidden="true" />
        </div>
      </section>

      {/* Filter Tabs - Sticky Headroom */}
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -50, opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "sticky z-40 bg-white/60 backdrop-blur-2xl border-b border-navy/5 py-3 px-4 shadow-xl shadow-navy/5 transition-all duration-300",
          isHidden ? "top-0" : "top-[105px] md:top-[110px]"
        )}
      >
        <div className="container mx-auto flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-500 tracking-wide uppercase ${activeCategory === cat
                ? "bg-navy text-white shadow-xl shadow-navy/20 ring-4 ring-navy/5 scale-105"
                : "bg-navy/5 text-navy/60 hover:bg-navy/10 hover:text-navy"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Gallery Content - Pinterest Multi-column Layout */}
      <section className="py-20 container mx-auto px-4 md:px-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-40 bg-navy/5 rounded-[3rem] border-2 border-dashed border-navy/10">
            <p className="text-navy/40 text-2xl font-display italic">No moments found in this category...</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {visibleImages.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="break-inside-avoid group relative rounded-[2rem] overflow-hidden cursor-zoom-in shadow-xl shadow-navy/5 ring-1 ring-navy/5 transform-gpu"
                  style={{ backfaceVisibility: "hidden" }}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.description || "Gallery Image"}
                    width={800}
                    height={1000}
                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Pinterest-style Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <div className="text-left transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <span className="text-gold font-bold tracking-widest text-xs uppercase mb-2 block">{activeCategory}</span>
                      <h4 className="text-white font-display font-bold text-xl leading-tight">
                        {image.description || "Campus Moment"}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Dynamic Pagination or CTA */}
        {visibleCount < filteredImages.length && (
          <div className="text-center mt-24">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="group px-12 py-5 bg-navy text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-navy/30 transition-all duration-500 border border-white/10 flex items-center gap-3 mx-auto disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{isLoadingMore ? "Loading..." : "Load More Memories"}</span>
              <div className={`w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/40 transition-colors ${isLoadingMore ? 'animate-spin' : ''}`}>
                {!isLoadingMore && <ChevronDown className="w-5 h-5 text-gold" />}
                {isLoadingMore && <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full" />}
              </div>
            </button>
          </div>
        )}
      </section>

      {/* Lightbox - High End */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy/95 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <X size={48} strokeWidth={1} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full h-[85vh] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.description || "Campus moment"}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div className="bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                  <span className="text-gold text-sm font-bold tracking-widest uppercase mb-1 block">VIEWING MOMENT</span>
                  <h3 className="text-white text-2xl font-display font-medium">{selectedImage.description}</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
