
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const ChatWindow = dynamic(() => import("./ChatWindow"), {
  loading: () => (
    <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-[30rem] bg-card border rounded-lg shadow-xl flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
  ssr: false // Chatbot is client-only interaction anyway
});

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <AnimatePresence>
          {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
        </AnimatePresence>
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            className="rounded-full h-16 w-16 shadow-lg"
            aria-label={isOpen ? "Close chat" : "Open chat"}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isOpen ? "x" : "message"}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
