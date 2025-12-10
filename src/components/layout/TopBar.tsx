
"use client";

import { Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TopBarProps {
  isTransparent?: boolean;
}

export default function TopBar({ isTransparent = false }: TopBarProps) {
  const topBarClasses = cn(
    "transition-colors duration-300",
    isTransparent ? "bg-transparent text-white" : "bg-primary/95 text-primary-foreground"
  );

  const linkClasses = cn(
    "hover:text-accent transition-colors"
  );

  const separatorClasses = cn(
    "text-primary-foreground/30"
  );

  return (
    <div className={topBarClasses}>
      <div className="container mx-auto flex h-11 max-w-7xl items-center justify-between px-4 text-sm">
        <div className="flex items-center gap-6">
          <a href="tel:07049110104" className={cn("flex items-center gap-2", linkClasses)}>
            <Phone className="h-4 w-4" />
            <span>070491 10104</span>
          </a>
          <a href="mailto:siakhargone@gmail.com" className={cn("hidden sm:flex items-center gap-2", linkClasses)}>
            <Mail className="h-4 w-4" />
            <span>siakhargone@gmail.com</span>
          </a>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="/contact#faq" className={linkClasses}>FAQ</Link>
          <span className={separatorClasses}>|</span>
          <Link href="/contact" className={linkClasses}>Support</Link>
        </div>
      </div>
    </div>
  );
}
