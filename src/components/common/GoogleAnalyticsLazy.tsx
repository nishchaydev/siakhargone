'use client';

import { useEffect } from 'react';

export default function GoogleAnalyticsLazy({ gaId }: { gaId: string }) {
    useEffect(() => {
        if (!gaId) return;

        // Load GTM/GA script only after the page is interactive/mounted
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        script.async = true;
        document.head.appendChild(script);

        const script2 = document.createElement('script');
        script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
        document.head.appendChild(script2);
    }, [gaId]);

    return null;
}
