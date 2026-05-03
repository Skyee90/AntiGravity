"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ChatbotOverlay from "./ChatbotOverlay";

export default function Scene4({ onNext }: { onNext: (option?: string) => void }) {
  const [showOptions, setShowOptions] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 1.2 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.8 } }
  } as const;

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  } as const;

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option === "Ask AI Guide") {
      setShowChatbot(true);
    } else {
      setTimeout(() => {
        onNext(option);
      }, 2000);
    }
  };

  // Branching paths for SVG
  const path1 = "M 50 100 Q 50 70 20 40 T 10 0";
  const path2 = "M 50 100 L 50 0";
  const path3 = "M 50 100 Q 50 70 80 40 T 90 0";

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="scene-content w-full max-w-4xl mx-auto relative z-10"
        onAnimationComplete={() => {
          setTimeout(() => setShowOptions(true), 3000);
        }}
      >
        {/* Branching Neural Paths SVG */}
        <div className="absolute inset-0 pointer-events-none flex justify-center items-end opacity-40 z-[-1]">
          <svg viewBox="0 0 100 100" className="w-full h-full max-w-[600px] max-h-[600px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(138,43,226,0)" />
                <stop offset="50%" stopColor="rgba(168,85,247,0.8)" />
                <stop offset="100%" stopColor="rgba(138,43,226,0)" />
              </linearGradient>
            </defs>
            {[path1, path2, path3].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="url(#pathGrad)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: 1 + i * 0.5, ease: "easeInOut" } as const}
              />
            ))}
            {/* Pulsing nodes on paths */}
            {[
               { cx: 20, cy: 40, delay: 4 },
               { cx: 50, cy: 30, delay: 4.5 },
               { cx: 80, cy: 40, delay: 5 }
            ].map((node, i) => (
              <motion.circle
                key={`node-${i}`}
                cx={node.cx}
                cy={node.cy}
                r="1"
                fill="#a855f7"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: node.delay, ease: "easeInOut" } as const}
              />
            ))}
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center mt-32">
          <motion.p variants={textVariants} className="text-secondary mb-4">
            Let’s keep it simple.
          </motion.p>
          <motion.h1 variants={textVariants} className="text-primary mb-8">
            You have a choice in front of you.
          </motion.h1>
          <motion.p variants={textVariants} className="text-secondary mb-12 text-2xl text-white">
            What do you do first?
          </motion.p>

          <AnimatePresence>
            {showOptions && !selectedOption && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="flex gap-4 w-full justify-center mt-8 px-4 flex-wrap"
              >
                {["Register to vote", "Ignore it", "Ask AI Guide"].map((option, idx) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className="glow-btn !mt-0 flex-1 min-w-[200px]"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedOption && selectedOption !== "Ask AI Guide" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12"
              >
                <p className="text-secondary italic">Moving forward...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Chatbot Overlay Component */}
      <AnimatePresence>
        {showChatbot && (
          <ChatbotOverlay 
            onClose={() => {
              setShowChatbot(false);
              onNext();
            }} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
