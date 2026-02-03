
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Sanskar International Academy',
        short_name: 'SIA Khargone',
        description: 'One of Khargone\'s top CBSE schools offering modern education, sports, arts, and academics.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F7F5F2', // Ivory
        theme_color: '#0C2E53', // Navy
        icons: [
            {
                src: '/favicon/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/favicon/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
