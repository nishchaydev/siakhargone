"use client";

import { sendGAEvent } from '@next/third-parties/google';

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
    try {
        sendGAEvent('event', eventName, params);
    } catch {
        // Fallback if GA script is unavailable (e.g. blocked by client)
        console.warn(`[GA Event]: ${eventName}`, params);
    }
};

// Specialized tracking functions for common events
export const trackAdmissionFormView = (source?: string) => {
    trackEvent('admission_form_view', {
        event_category: 'engagement',
        event_label: source || 'direct',
        value: 1
    });
};

export const trackAdmissionFormSubmit = (formType: string) => {
    trackEvent('admission_form_submit', {
        event_category: 'conversion',
        event_label: formType,
        value: 10
    });
};

export const trackPhoneClick = (phoneNumber: string, location: string) => {
    trackEvent('phone_click', {
        event_category: 'contact',
        event_label: `${location} - ${phoneNumber}`,
        value: 5
    });
};

export const trackWhatsAppClick = (location: string) => {
    trackEvent('whatsapp_click', {
        event_category: 'contact',
        event_label: location,
        value: 5
    });
};

export const trackEmailClick = (location: string) => {
    trackEvent('email_click', {
        event_category: 'contact',
        event_label: location,
        value: 3
    });
};

export const trackCTAClick = (ctaName: string, destination: string) => {
    trackEvent('cta_click', {
        event_category: 'navigation',
        event_label: `${ctaName} -> ${destination}`,
        value: 2
    });
};
