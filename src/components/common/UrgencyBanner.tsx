"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function UrgencyBanner() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const dismissed = sessionStorage.getItem("urgencyBannerDismissed_v2");
        if (dismissed) {
            setIsVisible(false);
        }
    }, []);

    const handleDismiss = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVisible(false);
        sessionStorage.setItem("urgencyBannerDismissed_v2", "true");
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-40 animate-bounce-slow">
            <Link href="/admissions" className="group relative block">
                {/* Cloud/Bubble Shape */}
                <div className="bg-white text-navy font-bold py-3 px-5 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl rounded-bl-none shadow-xl border-2 border-gold/20 hover:border-gold transition-all transform group-hover:-translate-y-1 flex items-center gap-2">
                    <span className="text-xl">🚀</span>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider animate-pulse">Limited Seats Available!</span>
                        <span className="text-sm font-bold text-navy">Admissions Open 2026-27</span>
                    </div>

                    {/* Dismiss Button (Absolute) */}
                    <button
                        onClick={handleDismiss}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Dismiss"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            </Link>
        </div>
    );
}
