"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Scene5({ onNext }: { onNext: () => void }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 1.5 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.8 } }
  } as const;

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  } as const;

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option !== "Trust it") {
      setTimeout(() => {
        onNext();
      }, 3000);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="scene-content w-full flex flex-col items-center"
      onAnimationComplete={() => {
        setTimeout(() => setShowOptions(true), 6000);
      }}
    >
      <AnimatePresence>
        {!selectedOption && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center absolute inset-0 pt-32"
          >
            <motion.p variants={textVariants} className="text-secondary mb-8">
              Now imagine this…
            </motion.p>
            
            <motion.p variants={textVariants} className="text-secondary mb-4">
              You’re scrolling.
            </motion.p>
            <motion.p variants={textVariants} className="text-secondary mb-12">
              You see a message.
            </motion.p>

            {/* Glitch text effect */}
            <motion.h1 
              variants={textVariants} 
              className="text-primary mb-12 relative inline-block text-4xl bg-black/50 px-8 py-4 rounded-xl border border-white/5"
              animate={{
                x: [-2, 2, -2, 0],
                opacity: [1, 0.8, 1, 1],
                textShadow: [
                  "2px 0 red, -2px 0 blue",
                  "-2px 0 red, 2px 0 blue",
                  "0 0 transparent",
                  "0 0 transparent"
                ]
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 3
              }}
            >
              "Vote instantly using WhatsApp."
            </motion.h1>

            <motion.p variants={textVariants} className="text-secondary mb-4">
              Looks real, right?
            </motion.p>
            <motion.h2 variants={textVariants} className="text-primary text-2xl mb-8">
              What do you do?
            </motion.h2>

            <AnimatePresence>
              {showOptions && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col gap-4 w-full max-w-sm mt-4 relative z-20"
                >
                  {["Trust it", "Ignore it", "Verify it"].map((option, idx) => (
                    <button
                      key={option}
                      onClick={() => handleOptionClick(option)}
                      className="glow-btn !mt-0 w-full hover:border-purple-400/50"
                      style={{ animationDelay: `${idx * 0.2}s` }}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedOption === "Trust it" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/20"
          >
            {/* Warning SVG Drawing Animation */}
            <div className="mb-12 relative w-32 h-32">
              <motion.svg 
                viewBox="0 0 100 100" 
                className="w-full h-full"
                initial={{ filter: "drop-shadow(0 0 0px red)" }}
                animate={{ filter: ["drop-shadow(0 0 5px red)", "drop-shadow(0 0 20px red)", "drop-shadow(0 0 5px red)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.path
                  d="M 50 10 L 90 90 L 10 90 Z"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" } as const}
                />
                <motion.line
                  x1="50" y1="35" x2="50" y2="65"
                  stroke="#ef4444"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                />
                <motion.circle
                  cx="50" cy="80" r="4"
                  fill="#ef4444"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 2 }}
                />
              </motion.svg>

              {/* Glitch Overlays */}
              <motion.div 
                className="absolute inset-0 bg-red-500/20 mix-blend-overlay"
                animate={{ x: [-5, 5, -5, 0], opacity: [0, 1, 0, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 2 + 1 }}
              />
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="text-red-400 text-xl font-medium mb-6 uppercase tracking-widest"
            >
              Your data is stolen.
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4 }}
              className="text-white text-4xl font-bold mb-6"
            >
              Your vote is cast by someone else.
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 6 }}
              className="text-red-500 text-5xl font-bold mb-16"
              style={{ textShadow: "0 0 40px rgba(239,68,68,0.5)" }}
            >
              Your voice is silenced.
            </motion.h1>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 8 }}
              onClick={() => setSelectedOption(null)}
              className="px-8 py-3 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest text-sm font-medium"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
        
        {selectedOption && selectedOption !== "Trust it" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <p className="text-secondary italic text-xl">Good choice. Moving forward...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
