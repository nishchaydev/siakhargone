"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Phone, Calendar, PenTool, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const actions = [
    {
        label: "WhatsApp",
        icon: MessageCircle,
        href: "https://wa.me/917049110104", // Replace with actual WhatsApp number
        color: "bg-green-500",
        external: true,
    },
    {
        label: "Apply Now",
        icon: PenTool,
        href: "/admissions",
        color: "bg-blue-600",
        external: false,
    },
    {
        label: "Book Visit",
        icon: Calendar,
        href: "/contact",
        color: "bg-purple-600",
        external: false,
    },
    {
        label: "Call Us",
        icon: Phone,
        href: "tel:+917049110104",
        color: "bg-red-500",
        external: true,
    },
];

export default function FloatingActionMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col-reverse gap-3 mb-2 mr-1 items-end">
                        {actions.map((action, index) => (
                            <motion.div
                                key={action.label}
                                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="flex items-center gap-3"
                            >
                                {/* Button Bubble */}
                                {action.external ? (
                                    <a
                                        href={action.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg hover:scale-110 transition-transform",
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
                                            "flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg hover:scale-110 transition-transform",
                                            action.color
                                        )}
                                        aria-label={action.label}
                                    >
                                        <action.icon className="w-5 h-5" />
                                    </Link>
                                )}
                                {/* Label */}
                                <span className="bg-white text-navy-dark text-xs font-bold px-2 py-1 rounded-md shadow-md">
                                    {action.label}
                                </span>

                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                onClick={toggleMenu}
                className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl focus:outline-none focus:ring-4 focus:ring-gold/50 transition-colors z-50",
                    isOpen ? "bg-red-500 rotate-45" : "bg-gold"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Quick Actions"
            >
                <Plus className={cn("w-8 h-8 transition-transform duration-300", isOpen ? "rotate-45" : "rotate-0")} />
            </motion.button>
        </div>
    );
}
