"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { schoolData } from "@/data/schoolData";

export function PromotionalModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after 1.5 seconds for better stability
        const timer = setTimeout(() => {
            // Basic session check to avoid annoyance (Optional: remove if they want it always)
            const hasSeen = sessionStorage.getItem("hasSeenPromoModal_v8");
            if (!hasSeen) {
                setIsOpen(true);
                sessionStorage.setItem("hasSeenPromoModal_v8", "true");
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-white border-none shadow-2xl z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="relative flex flex-col items-center text-center">

                    {/* Visual Header / Poster Area */}
                    <DialogHeader className="sr-only">
                        <DialogTitle>Admissions Open 2026-27 - Sanskar International Academy</DialogTitle>
                    </DialogHeader>

                    <div className="w-full relative bg-transparent flex items-center justify-center overflow-hidden">
                        <Link href="/admissions" onClick={() => setIsOpen(false)} className="block w-full h-full relative">
                            <Image
                                src="https://res.cloudinary.com/dkits80xk/image/upload/v1770624171/2799608355_1_q0ysdq.png"
                                alt="Admissions Open 2026-27 Poster"
                                width={400}
                                height={400}
                                className="w-full h-auto object-contain"
                                priority
                                sizes="(max-width: 400px) 100vw, 400px"
                            />
                        </Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
