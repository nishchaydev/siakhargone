
"use client";

import { useState, useEffect, useRef } from 'react';

export function useActiveSection(sectionIds: string[], options?: IntersectionObserverInit) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Default options
    const observerOptions = options || {
      rootMargin: '-40% 0px -60% 0px', // Adjusted to better capture the section in the middle
      threshold: 0
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const { current: currentObserver } = observerRef;

    sectionIds.forEach(id => {
      if(!id) return;
      const element = document.getElementById(id);
      if (element) {
        currentObserver.observe(element);
      }
    });

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [sectionIds, options]);

  return activeSection;
}
