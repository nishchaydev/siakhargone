
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      display: ['Playfair Display', 'serif'],
      body: ['Inter', 'sans-serif'],
      hindi: ['Mukta', 'sans-serif'],
      sans: ['Inter', 'sans-serif'], // Keep sans for default
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Strict Theme Palette
        navy: {
          DEFAULT: '#0C2E53',
          dark: '#091E36',
        },
        siaOrange: {
          DEFAULT: '#FF7A1A',
        },
        gold: {
          DEFAULT: '#D4AF37',
        },
        bgIvory: {
          DEFAULT: '#F7F5F2',
        },
        cardBorder: {
          DEFAULT: 'rgba(0,0,0,0.06)',
        },
        'royal-blue': '#0D2F81',
        'gold-accent': '#D4B05D',
        'light-gold': '#E2C67E',
        'light-grey': '#F7F8FA',



        // Shadcn UI tokens
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: '#0C2E53',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#D4AF37',
          foreground: '#091E36',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: '#D4AF37',
          foreground: '#091E36',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: '#FF7A1A',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: '1rem',
        '2xl': '1.5rem'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-in-out',
      },
      boxShadow: {
        soft: '0 4px 15px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
