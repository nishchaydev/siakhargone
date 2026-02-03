"use client";

import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

// Official WhatsApp Brand Colors
// Green: #25D366
// White: #FFFFFF

const whatsappNumber = "917049110104";
const textMessage = "Hi, I want admission information.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;

export default function FloatingWhatsApp() {
    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'floating_button' })}
            className="fixed bottom-28 right-6 z-50 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group"
            aria-label="Chat with us on WhatsApp"
        >
            {/* Desktop Label - Hidden on Mobile */}
            <span className="hidden md:flex bg-white/95 backdrop-blur-sm text-slate-800 font-bold text-sm px-4 py-2 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-slate-100 items-center gap-2 group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-all">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Chat with us
            </span>

            {/* Button Bubble */}
            <div
                className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-full text-white shadow-[0_4px_14px_rgba(37,211,102,0.5)] transition-all",
                    "bg-[#25D366] hover:bg-[#20bd5a]"
                )}
            >
                <MessageCircle className="w-8 h-8 fill-white/20" />
            </div>
        </a>
    );
}
