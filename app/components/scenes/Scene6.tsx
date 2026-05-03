"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Scene6({ onNext }: { onNext: () => void }) {
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
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="scene-content w-full flex flex-col items-center relative z-10"
      onAnimationComplete={() => {
        setTimeout(() => setShowOptions(true), 6000);
      }}
    >
      {/* Topographical Map Ripple Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-[-1] overflow-hidden opacity-30">
        <svg viewBox="0 0 100 100" className="w-[150vw] h-[150vw] max-w-[1500px] max-h-[1500px]">
          {[...Array(6)].map((_, i) => {
            // Create slightly wavy circles for a topographical effect
            const points = [];
            const radius = 5 + i * 8;
            for (let a = 0; a < Math.PI * 2; a += 0.5) {
              const r = radius + Math.sin(a * 4 + i) * 2;
              points.push(`${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`);
            }
            const pathData = `M ${points.join(' L ')} Z`;

            return (
              <motion.path
                key={i}
                d={pathData}
                fill="none"
                stroke="url(#rippleGrad)"
                strokeWidth="0.2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.5, 2], opacity: [0, 0.5, 0] }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  delay: i * 1.3,
                  ease: "linear"
                } as const}
              />
            );
          })}
          <defs>
            <radialGradient id="rippleGrad">
              <stop offset="0%" stopColor="rgba(168,85,247,1)" />
              <stop offset="100%" stopColor="rgba(138,43,226,0)" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <motion.p variants={textVariants} className="text-secondary mb-8 mt-16">
        Fast forward.
      </motion.p>
      
      <motion.h1 variants={textVariants} className="text-primary mb-12">
        It’s voting day.
      </motion.h1>

      <motion.p variants={textVariants} className="text-secondary mb-4">
        You reach the polling station.
      </motion.p>
      
      <motion.p variants={textVariants} className="text-secondary mb-2">
        There’s a line.
      </motion.p>
      <motion.p variants={textVariants} className="text-secondary mb-8">
        People are waiting.
      </motion.p>
      
      <motion.p variants={textVariants} className="text-secondary mb-12">
        No one’s rushing.
      </motion.p>

      <motion.h2 variants={textVariants} className="text-primary text-2xl mb-8">
        What do you do?
      </motion.h2>

      <AnimatePresence>
        {showOptions && !selectedOption && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4 w-full max-w-sm mt-4"
          >
            {["Wait", "Leave", "Ask for help"].map((option, idx) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="glow-btn !mt-0 w-full"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12"
          >
            <p className="text-secondary italic">Moving forward...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
