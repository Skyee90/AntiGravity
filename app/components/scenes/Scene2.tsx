"use client";

import { motion } from "framer-motion";
import { useState, KeyboardEvent } from "react";

export default function Scene2({ onNext, setUserName, userName }: { onNext: () => void, setUserName: (name: string) => void, userName: string }) {
  const [step, setStep] = useState(0);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userName.trim() !== "") {
      setStep(1);
      setTimeout(() => {
        onNext();
      }, 4000);
    }
  };

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

  // Generate some paths for a fingerprint-like pattern
  const fingerprintPaths = Array.from({ length: 8 }).map((_, i) => {
    const r = 30 + i * 15;
    return `M 50 ${50 - r} A ${r} ${r} 0 0 1 ${50 + r} 50 A ${r} ${r} 0 0 1 50 ${50 + r} A ${r} ${r} 0 0 1 ${50 - r} 50 A ${r} ${r} 0 0 1 50 ${50 - r}`;
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="scene-content w-full flex flex-col items-center"
    >
      {/* Fingerprint / Identity SVG drawing background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10">
        <svg viewBox="0 0 100 100" className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px]">
          {fingerprintPaths.map((path, i) => (
            <motion.path
              key={i}
              d={path}
              fill="none"
              stroke="#8a2be2"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray={i % 2 === 0 ? "5 5" : "10 5"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                duration: 4 + i, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.2
              }}
            />
          ))}
        </svg>
      </div>

      {step === 0 ? (
        <>
          <motion.p variants={textVariants} className="text-secondary mb-4 relative z-10">
            Before we go further…
          </motion.p>
          <motion.h1 variants={textVariants} className="text-primary mb-8 relative z-10">
            What should I call you?
          </motion.h1>
          <motion.input
            variants={textVariants}
            type="text"
            className="input-field relative z-10"
            placeholder="Type your name and press Enter"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center relative z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-primary mb-4"
          >
            Alright, {userName}.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-secondary mb-4"
          >
            Stay with me.
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            className="text-primary mt-8 glow-text"
          >
            This is about you.
          </motion.h1>
        </motion.div>
      )}
    </motion.div>
  );
}
