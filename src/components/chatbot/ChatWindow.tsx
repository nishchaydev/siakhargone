
"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import type { ChatMessage, FlowMessage } from "@/lib/definitions";
import { chatbotFlow } from "@/ai/flows/chatbot-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "0",
      role: "model",
      content: "Hello! I’m SIA Assistant! Ask me anything about the school.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const exampleQuestions = [
    'How do I apply for admissions?',
    'What are the contact details?',
    'What facilities do you offer?',
    'Tell me about the school mission'
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    const aiLoadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "model",
      content: <Loader2 className="h-5 w-5 animate-spin" />,
      isLoading: true,
    };

    const currentMessages = [...messages, userMessage];
    setMessages([...currentMessages, aiLoadingMessage]);
    setInput("");

    startTransition(async () => {
      const flowMessages: FlowMessage[] = currentMessages.map(msg => ({
        role: msg.role,
        content: [{ text: msg.content as string }]
      }));
      
      const response = await chatbotFlow(flowMessages);
      
      const aiResponseMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: "model",
        content: response,
      };

      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isLoading),
        aiResponseMessage,
      ]);
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <motion.div 
      className="absolute bottom-20 right-0 w-80 sm:w-96 h-[30rem] bg-card border rounded-lg shadow-xl flex flex-col"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
    >
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="text-lg font-semibold">Ask SIA – Smart Assistant</h3>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{
                  opacity: { duration: 0.2 },
                  layout: {
                    type: "spring",
                    bounce: 0.4,
                    duration: 0.4
                  }
                }}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "model" && (
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <Bot size={20} />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 max-w-[80%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                 {message.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                    <User size={20} />
                  </div>
                )}
              </motion.div>
            ))}
             {messages.length <= 1 && exampleQuestions.length > 0 && (
                 <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-2"
                >
                    <div className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                        <span>Try asking...</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {exampleQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleSendMessage(q)}
                                className="text-left text-sm p-2 bg-muted/50 hover:bg-muted rounded-md transition-colors"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </motion.div>
             )}
          </AnimatePresence>
        </div>
      </ScrollArea>
      <div className="p-3 border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isPending}
            autoFocus
          />
          <Button type="submit" size="icon" disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
