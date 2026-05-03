"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, KeyboardEvent, useEffect, useRef } from "react";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), { ssr: false });

interface Message {
  id: string;
  text: string;
  sender: "ai" | "user";
}

export default function ChatbotOverlay({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Not sure?", sender: "ai" },
    { id: "2", text: "Ask me anything about voting.", sender: "ai" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const userMsg: Message = { id: Date.now().toString(), text: userText, sender: "user" };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      const data = await response.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { 
          id: (Date.now() + 1).toString(), 
          text: "System offline. " + data.error, 
          sender: "ai" 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          id: (Date.now() + 1).toString(), 
          text: data.reply, 
          sender: "ai" 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: "I'm having trouble connecting right now. Please try again later.", 
        sender: "ai" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" } as const}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
    >
      <div className="w-full max-w-lg bg-[#050510] border border-purple-500/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(138,43,226,0.1)] flex flex-col h-[80vh] max-h-[800px]">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02] relative overflow-hidden">
          {/* subtle animated background in header */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" } as const}
          />
          
          <div className="flex items-center gap-4 relative z-10">
            {/* Lottie Animation Orb */}
            <div className="w-12 h-12 relative flex items-center justify-center -ml-2">
              <Player
                autoplay
                loop
                src="https://raw.githubusercontent.com/LottieFiles/lottie-react/master/example/src/lf20_tkwz8nxd.json" // Reliable Lottie Orb URL
                style={{ height: '50px', width: '50px', filter: 'hue-rotate(-45deg) saturate(2)' }}
                speed={isTyping ? 2 : 1}
              />
            </div>
            <div>
              <span className="text-white font-medium tracking-wide block">AI Guide</span>
              <AnimatePresence>
                {isTyping && (
                  <motion.span 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-purple-400 text-xs tracking-wider uppercase block"
                  >
                    Processing...
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors p-2 relative z-10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar scroll-smooth">
          {messages.map((msg, idx) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed text-[15px] ${
                  msg.sender === "user" 
                    ? "bg-purple-600/30 text-white rounded-tr-sm border border-purple-500/20" 
                    : "bg-white/5 border border-white/10 text-white/90 rounded-tl-sm shadow-inner"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          
          <AnimatePresence>
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2 h-[52px]">
                  {/* Advanced Typing Indicator */}
                  {[0, 1, 2].map((i) => (
                    <motion.div 
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full" 
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3],
                        y: [0, -4, 0]
                      }} 
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.8, 
                        delay: i * 0.15,
                        ease: "easeInOut"
                      } as const} 
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/5 bg-white/[0.01]">
          <div className="relative group">
            {/* Glowing border effect on focus-within */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-focus-within:opacity-30 blur transition duration-500"></div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              className="relative w-full bg-[#0a0a1a] border border-white/10 rounded-full py-4 pl-6 pr-16 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 transition-colors shadow-inner"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-purple-600/20 hover:bg-purple-500/40 disabled:opacity-30 disabled:bg-white/5 rounded-full flex items-center justify-center transition-all text-white border border-purple-500/30 disabled:border-transparent group"
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                whileHover={{ x: 2, y: -2 }}
                className={inputValue.trim() ? "text-purple-300" : "text-white/50"}
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </motion.svg>
            </button>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={onClose}
              className="text-white/40 hover:text-white/80 text-sm transition-colors border-b border-transparent hover:border-white/50 pb-0.5"
            >
              Return to Journey
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
