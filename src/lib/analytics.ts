"use client";

import { sendGAEvent } from '@next/third-parties/google';

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, params);
    } else {
        // Fallback if gtag is not available (e.g. ad blocker)
        console.log(`[GA Event]: ${eventName}`, params);
    }
};
