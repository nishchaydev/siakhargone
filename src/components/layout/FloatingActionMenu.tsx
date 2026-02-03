"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Phone, Calendar, PenTool, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { schoolData } from "@/data/schoolData";

const whatsappNumber = schoolData.contact.phone[0].replace(/[^0-9]/g, '');

const actions = [
    {
        label: "Enquire",
        icon: PenTool,
        href: "/admissions",
        color: "bg-gold",
        external: false,
    },
    {
        label: "WhatsApp",
        icon: MessageCircle,
        href: "https://wa.me/917049110104?text=Hi%2C%20I%20want%20to%20know%20about%20admissions",
        color: "bg-green-500",
        external: true,
    },
];

export default function FloatingActionMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />
                )}
            </AnimatePresence>

            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
                <AnimatePresence>
                    {isOpen && (
                        <div className="flex flex-col-reverse gap-4 mb-2 mr-1 items-end">
                            {actions.map((action, index) => (
                                <motion.div
                                    key={action.label}
                                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className="flex items-center gap-3"
                                >
                                    {/* Label */}
                                    <span className="bg-white text-navy font-bold text-xs px-3 py-1.5 rounded-lg shadow-xl border border-gray-100 whitespace-nowrap">
                                        {action.label}
                                    </span>

                                    {/* Button Bubble */}
                                    {action.external ? (
                                        <a
                                            href={action.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(
                                                "flex items-center justify-center w-12 h-12 rounded-full text-white shadow-xl hover:scale-110 active:scale-95 transition-all",
                                                action.color
                                            )}
                                            aria-label={action.label}
                                        >
                                            <action.icon className="w-5 h-5" />
                                        </a>
                                    ) : (
                                        <Link
                                            href={action.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center justify-center w-12 h-12 rounded-full text-white shadow-xl hover:scale-110 active:scale-95 transition-all",
                                                action.color
                                            )}
                                            aria-label={action.label}
                                        >
                                            <action.icon className="w-5 h-5" />
                                        </Link>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                {/* Main Toggle Button */}
                <motion.button
                    onClick={toggleMenu}
                    className={cn(
                        "flex items-center justify-center w-14 h-14 rounded-full text-white shadow-2xl shadow-gold/20 focus:outline-none transition-colors",
                        isOpen ? "bg-red-500" : "bg-gold"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Toggle Quick Actions"
                >
                    <Plus className={cn("w-7 h-7 transition-all duration-300", isOpen ? "rotate-[135deg]" : "rotate-0")} />
                </motion.button>
            </div>
        </>
    );
}
