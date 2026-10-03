import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatbotModal } from "./ChatbotModal";

export function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 240, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-forest/85 text-ivory backdrop-blur-2xl shadow-[0_16px_40px_rgba(20,35,28,0.35)] transition-colors hover:bg-forest md:bottom-10 md:right-10"
        aria-label={isOpen ? "Close liaison concierge" : "Open institutional client concierge"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6 stroke-[1.5]" />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageSquare className="h-6 w-6 stroke-[1.5]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Ring Wave Animation */}
        {!isOpen && (
          <>
            <motion.span
              animate={{ scale: [1, 1.4, 1.6], opacity: [0.7, 0.3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-2 border-sage/60 pointer-events-none"
            />
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75"></span>
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-sage border-2 border-ivory"></span>
            </span>
          </>
        )}
      </motion.button>

      <ChatbotModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
