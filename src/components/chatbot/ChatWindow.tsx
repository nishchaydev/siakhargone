"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, ChevronRight, MessageCircle } from "lucide-react";
import type { ChatMessage } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { submitChatbotLead } from "@/app/actions/chatbot-lead";

interface ChatWindowProps {
  onClose: () => void;
}

interface QuickOption {
  label: string;
  value: string;
  action?: () => void;
}

interface LocalChatMessage extends ChatMessage {
  options?: QuickOption[];
}

type EnquiryStep = 'none' | 'name' | 'phone' | 'class' | 'message';

// --- STATIC KNOWLEDGE BASE ---
// --- STATIC KNOWLEDGE BASE ---
const KNOWLEDGE_BASE = [
  {
    keywords: ['hi', 'hello', 'hey', 'start', 'menu'],
    answer: "Hello! Welcome to Sanskar International Academy. How can I assist you today?",
    options: [
      { label: "Admissions Enquiry 📝", value: "I want to enquire for admission" },
      { label: "Fee Calculator 🧮", value: "calculator" },
      { label: "Academics", value: "Tell me about academics" },
      { label: "Contact Us", value: "What are the contact details?" },
    ]
  },
  {
    keywords: ['admission', 'apply', 'join', 'seat', 'enroll'],
    answer: "Admissions for the 2026-27 session are currently OPEN. You can enquire directly here!",
    options: [
      { label: "Start Enquiry 📝", value: "I want to enquire for admission" },
      { label: "Fee Calculator 🧮", value: "calculator" },
      { label: "Chat on WhatsApp 💬", value: "whatsapp" },
      { label: "Check Age Criteria", value: "What is the age criteria?" }
    ]
  },
  {
    keywords: ['fee', 'cost', 'payment', 'charges', 'money'],
    answer: "Our fee structure is designed to be transparent. You can estimate the exact amount using our Fee Calculator.",
    options: [
      { label: "Open Fee Calculator 🧮", value: "calculator" },
      { label: "Start Enquiry", value: "I want to enquire for admission" },
      { label: "Chat on WhatsApp 💬", value: "whatsapp" }
    ]
  },
  {
    keywords: ['calculator', 'estimate', 'calculation'],
    answer: "You can calculate the exact fees for your child's class and bus route on our Fees page.",
    options: [
      { label: "Go to Fee Calculator", value: "open_calculator" },
      { label: "Download Fee Structure", value: "download_fees" }
    ]
  },
  {
    keywords: ['contact', 'phone', 'email', 'address', 'location', 'reach'],
    answer: "You can reach us at:\n📍 NH-52, Khandwa Road, Khargone\n📞 070491 10104\n📧 info@siakhargone.com",
    options: [
      { label: "Request Callback", value: "I want to enquire for admission" }
    ]
  },
  {
    keywords: ['facility', 'infrastructure', 'lab', 'library', 'sport', 'bus', 'transport'],
    answer: "SIA offers world-class facilities including Smart Classrooms, Science Labs, a Digital Library, and extensive Sports infrastructure.",
    options: [
      { label: "View Gallery", value: "Show me photos" },
      { label: "Transport Details", value: "Tell me about transport" }
    ]
  },
  {
    keywords: ['exam', 'result', 'test', 'schedule'],
    answer: "Examination schedules and results are posted on the Notice Board. Parents can also check the 'Academics' section.",
    options: [
      { label: "Check Notices", value: "Show me latest notices" },
      { label: "Download Datesheet", value: "Download exam schedule" }
    ]
  },
  {
    keywords: ['job', 'career', 'vacancy', 'teach', 'hiring', 'work', 'staff'],
    answer: "We are always looking for passionate educators! You can check current openings and apply directly via our Careers page.",
    options: [
      { label: "View Openings", value: "Show me career opportunities" }, // Could link to /careers if bot supported links, but text flow is fine
      { label: "Apply Now", value: "How to apply for a job?" }
    ]
  }
];

const findBestMatch = (text: string): { answer: string, options?: QuickOption[] } => {
  const lowerText = text.toLowerCase();
  const match = KNOWLEDGE_BASE.find(item =>
    item.keywords.some(keyword => lowerText.includes(keyword))
  );

  if (match) {
    return { answer: match.answer, options: match.options };
  }

  return {
    answer: "I'm not sure I understood that correctly. Here are some topics I can help with:",
    options: [
      { label: "Admissions Enquiry 📝", value: "I want to enquire for admission" },
      { label: "Fee Calculator 🧮", value: "calculator" },
      { label: "Chat on WhatsApp 💬", value: "whatsapp" },
      { label: "Contact Support", value: "Contact" },
      { label: "Facilities", value: "Facilities" },
    ]
  };
};

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<LocalChatMessage[]>([
    {
      id: "0",
      role: "model",
      content: "Hello! I’m SIA Assistant! Ask me anything about the school.",
      options: [
        { label: "Admissions Enquiry 📝", value: "I want to enquire for admission" },
        { label: "Fee Calculator 🧮", value: "calculator" },
        { label: "Chat on WhatsApp 💬", value: "whatsapp" },
        { label: "Facilities 🏫", value: "Facilities" },
        { label: "Contact Us 📞", value: "Contact" }
      ]
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Enquiry State
  const [enquiryStep, setEnquiryStep] = useState<EnquiryStep>('none');
  const [enquiryData, setEnquiryData] = useState({ name: '', phone: '', class: '', message: '' });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addBotMessage = (content: string, options?: QuickOption[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "model",
        content,
        options
      }]);
      setIsTyping(false);
    }, 600);
  };

  const handleEnquiryFlow = async (text: string) => {
    // 1. Trigger Enquiry
    if (enquiryStep === 'none' && (text.toLowerCase().includes("enquire") || text.toLowerCase().includes("admission"))) {
      setEnquiryStep('name');
      addBotMessage("Great! I can help you with that. First, may I know your name?");
      return true;
    }

    // 2. Capture Name
    if (enquiryStep === 'name') {
      setEnquiryData(prev => ({ ...prev, name: text }));
      setEnquiryStep('phone');
      addBotMessage("Nice to meet you, " + text + "! Could you please share your Mobile Number?");
      return true;
    }

    // 3. Capture Phone
    if (enquiryStep === 'phone') {
      // Basic validation
      if (!/^\d{10}$/.test(text.replace(/\D/g, '')) && !text.includes("+")) {
        addBotMessage("Please enter a valid 10-digit mobile number so we can reach you.");
        return true;
      }
      setEnquiryData(prev => ({ ...prev, phone: text }));
      setEnquiryStep('class');
      addBotMessage("Which class are you looking admission for? (e.g., Nursery, Class 5, Class 11)");
      return true;
    }

    // 4. Capture Class
    if (enquiryStep === 'class') {
      setEnquiryData(prev => ({ ...prev, class: text }));
      setEnquiryStep('message');
      addBotMessage("Any specific query or message for us? (Or type 'None')");
      return true;
    }

    // 5. Capture Message & Submit
    if (enquiryStep === 'message') {
      setEnquiryData(prev => ({ ...prev, message: text }));
      setEnquiryStep('none');

      const finalData = { ...enquiryData, message: text };

      setIsTyping(true);

      // Submit to Server Action
      const result = await submitChatbotLead(finalData);

      setIsTyping(false);

      if (result.success) {
        addBotMessage("Thank you! Your enquiry has been registered. Our team will contact you shortly. You can also chat with us directly on WhatsApp for faster response.", [
          { label: "Continue on WhatsApp 💬", value: "whatsapp" },
          { label: "Back to Menu", value: "Menu" }
        ]);
      } else {
        addBotMessage("Sorry, I couldn't register your enquiry at the moment. Please try calling us directly.", [
          { label: "Contact Numbers", value: "Contact" }
        ]);
      }
      return true;
    }

    return false;
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    if (text === "whatsapp") {
      window.open("https://wa.me/917049110104?text=Hi, I want admission information.", "_blank");
      return;
    }

    if (text === "open_calculator") {
      window.location.href = "/fees";
      return;
    }

    // 1. Add User Message
    const userMessage: LocalChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // 2. Check for Enquiry Flow Interception
    const handledByEnquiry = await handleEnquiryFlow(text);
    if (handledByEnquiry) return;

    // 3. Normal Chat Bot Logic
    setIsTyping(true);
    setTimeout(() => {
      const { answer, options } = findBestMatch(text);
      const botMessage: LocalChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: answer,
        options: options
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <motion.div
      className="absolute bottom-20 right-0 w-80 sm:w-96 h-[32rem] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      {/* Header */}
      <div className="bg-navy p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-full">
            <Bot size={20} className="text-gold" />
          </div>
          <div>
            <h3 className="font-bold text-base leading-none text-white tracking-wide">SIA Assistant</h3>
            <p className="text-[10px] text-green-300 mt-1 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open('https://wa.me/917049110104', '_blank')}
            className="text-white hover:bg-white/20 h-8 w-8 rounded-full"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="h-5 w-5 fill-current" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20 h-8 w-8 rounded-full">
            {/* Close Icon handled by parent usually, but we can add one here if needed, 
                though UI usually has a close button on the floating trigger. 
                Let's keep it clean or add a minimize. */}
            <span className="sr-only">Close</span>
            <ChevronRight className="rotate-90" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 bg-gray-50">
        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex flex-col gap-2 max-w-[85%]",
                  message.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div
                  className={cn(
                    "px-4 py-3 rounded-2xl text-sm shadow-sm",
                    message.role === "user"
                      ? "bg-navy text-white rounded-tr-sm"
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm"
                  )}
                >
                  <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
                </div>

                {/* Options Chips */}
                {message.role === "model" && message.options && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {message.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(opt.value)}
                        className="text-xs bg-white border border-gold/40 text-navy hover:bg-gold/10 hover:border-gold px-3 py-1.5 rounded-full transition-colors duration-200 font-medium shadow-sm"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex items-start gap-2 max-w-[85%] mr-auto">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm flex gap-1 items-center h-10">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 bg-white border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              enquiryStep === 'name' ? "Enter your Name..." :
                enquiryStep === 'phone' ? "Enter your Phone Number..." :
                  enquiryStep === 'class' ? "Enter Class (e.g. Nursery)..." :
                    enquiryStep === 'message' ? "Enter Message..." :
                      "Type your query..."
            }
            className="rounded-full bg-gray-50 border-gray-200 focus-visible:ring-gold focus-visible:ring-offset-0"
            autoFocus
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="rounded-full bg-navy hover:bg-navy-light shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <div className="text-[10px] text-center text-muted-foreground mt-2">
          Powered by SIA Smart Support
        </div>
      </div>
    </motion.div >
  );
}
