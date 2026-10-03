import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, RotateCcw, Building2 } from "lucide-react";
import { sendChatMessage, ChatMessage } from "@/lib/chat-service";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_PROMPTS = [
  "Monthly Manufacturing & Export Capacity",
  "Sustainable Materials & Technical Knits",
  "ESG Standards & EU Digital Product Passport",
];

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Parses raw text into beautifully formatted typography,
 * converting markdown asterisks, hashes, and bullets into clean semantic HTML.
 */
function renderFormattedContent(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="my-2 space-y-1.5 pl-4 list-disc marker:text-forest"
        >
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  const formatInline = (str: string): React.ReactNode[] => {
    // Replace **bold** with <strong>
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
        return (
          <strong key={i} className="font-semibold text-charcoal">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    // Markdown Headers (### or ##)
    if (trimmed.startsWith("### ") || trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
      flushList();
      const title = trimmed.replace(/^#{1,4}\s+/, "");
      elements.push(
        <h4
          key={`header-${index}`}
          className="font-serif text-sm font-semibold tracking-wide text-charcoal mt-3 mb-1.5 first:mt-0"
        >
          {formatInline(title)}
        </h4>
      );
      return;
    }

    // Bullet Points (* or -)
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const itemText = trimmed.replace(/^[\*\-]\s+/, "");
      currentList.push(
        <li key={`bullet-${index}`} className="text-[13px] leading-relaxed text-charcoal">
          {formatInline(itemText)}
        </li>
      );
      return;
    }

    // Standard text line / paragraph
    flushList();
    elements.push(
      <p key={`p-${index}`} className="text-[13.5px] leading-relaxed mb-2 last:mb-0">
        {formatInline(trimmed)}
      </p>
    );
  });

  flushList();
  return elements;
}

export function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content:
        "Welcome to ACTIF Global Ventures. This is the Institutional Client Liaison. How may our commercial desk assist your global sourcing, manufacturing specifications, or ESG compliance requirements today?",
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-5).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await sendChatMessage({
        data: {
          message: text,
          history: historyPayload,
        },
      });

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.reply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const fallbackMessage: ChatMessage = {
        id: `assistant-err-${Date.now()}`,
        role: "assistant",
        content:
          "ACTIF Global Ventures operates as an integrated knit-to-pack manufacturer in Tirupur, India, producing 150 MT greige fabric, 50 MT finished fabric, and 5 export containers monthly. For direct commercial quotes, please connect with our executive desk at info@actif.ltd or +91 98946 02235.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "Conversation reset. How may our commercial desk assist your global textile manufacturing or sustainability requirements?",
        timestamp: Date.now(),
      },
    ]);
    setInputValue("");
  };

  const showInitialPrompts = messages.length <= 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.38, ease: EASE }}
          className="fixed bottom-6 right-6 z-50 flex h-[620px] max-h-[86vh] w-[92vw] max-w-[440px] flex-col overflow-hidden rounded-3xl border border-white/50 bg-ivory/80 backdrop-blur-2xl text-charcoal shadow-[0_28px_70px_-15px_rgba(15,25,20,0.3)] md:bottom-10 md:right-10"
          role="dialog"
          aria-labelledby="actif-client-title"
        >
          {/* Glass Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-forest/90 px-6 py-4.5 text-ivory backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-champagne backdrop-blur-xl border border-white/20 shadow-xs"
              >
                <Building2 className="h-5 w-5 stroke-[1.5]" />
              </motion.div>
              <div>
                <h3
                  id="actif-client-title"
                  className="font-serif text-lg tracking-wider text-ivory drop-shadow-xs"
                >
                  ACTIF Global Concierge
                </h3>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage shadow-[0_0_8px_rgb(122,158,126)]" />
                  <span className="text-[10.5px] uppercase tracking-widest text-on-forest-muted">
                    Institutional Client Directorate
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <motion.button
                whileHover={{ scale: 1.1, rotate: -45 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={handleReset}
                title="Reset conversation"
                className="flex h-8 w-8 items-center justify-center rounded-full text-on-forest-muted transition-colors hover:bg-white/20 hover:text-ivory"
                aria-label="Clear chat history"
              >
                <RotateCcw className="h-4 w-4 stroke-[1.5]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={onClose}
                title="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-on-forest-muted transition-colors hover:bg-white/20 hover:text-ivory"
                aria-label="Close chat window"
              >
                <X className="h-5 w-5 stroke-[1.5]" />
              </motion.button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 text-sm scroll-smooth">
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`max-w-[88%] px-4.5 py-3.5 leading-relaxed shadow-xs transition-all ${
                        isAssistant
                          ? "rounded-2xl rounded-tl-sm border border-charcoal/10 bg-white/85 backdrop-blur-md text-charcoal drop-shadow-xs"
                          : "rounded-2xl rounded-tr-sm bg-forest text-ivory shadow-sm"
                      }`}
                    >
                      {renderFormattedContent(msg.content)}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Initial Staggered Topic Cards */}
            {showInitialPrompts && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="pt-2 pb-1 space-y-2"
              >
                <div className="text-[10.5px] uppercase tracking-wider text-charcoal-soft/80 font-mono px-1">
                  Key Institutional Inquiries
                </div>
                <div className="flex flex-col gap-2">
                  {INITIAL_PROMPTS.map((prompt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.015, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="text-left rounded-xl border border-charcoal/12 bg-white/70 backdrop-blur-md px-4 py-2.5 text-xs text-charcoal transition-all hover:border-forest/50 hover:bg-white/95 shadow-xs"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Framer Motion Typing Wave Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-charcoal/10 bg-white/85 backdrop-blur-md px-4 py-3 shadow-xs">
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
                    className="h-2 w-2 rounded-full bg-forest"
                  />
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.7, delay: 0.15, ease: "easeInOut" }}
                    className="h-2 w-2 rounded-full bg-sage"
                  />
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.7, delay: 0.3, ease: "easeInOut" }}
                    className="h-2 w-2 rounded-full bg-champagne"
                  />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Frosted Semi-Transparent Input Footer */}
          <div className="border-t border-charcoal/10 bg-ivory/70 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 rounded-full border border-charcoal/15 bg-white/85 backdrop-blur-md px-4 py-2 shadow-xs transition-colors focus-within:border-forest focus-within:bg-white/95">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask about capacities, ESG, products..."
                className="w-full bg-transparent text-sm text-charcoal placeholder:text-charcoal-soft/70 focus:outline-none disabled:opacity-50"
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isLoading}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-ivory transition-colors hover:bg-forest-deep disabled:opacity-25"
                aria-label="Send message"
              >
                <Send className="h-3.5 w-3.5 stroke-[2]" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
