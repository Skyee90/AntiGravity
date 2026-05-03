"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Scene7({ onNext }: { onNext: () => void }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="scene-content"
    >
      {/* Subtle motion background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div 
          className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent top-1/2 -translate-y-1/2"
          animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" } as const}
        />
        <motion.div 
          className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent left-1/2 -translate-x-1/2"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" } as const}
        />
      </div>

      <motion.h1 variants={textVariants} className="text-primary mb-12">
        Here’s the truth…
      </motion.h1>
      
      <motion.p variants={textVariants} className="text-secondary mb-4">
        One small decision…
      </motion.p>
      <motion.p variants={textVariants} className="text-secondary mb-12">
        Doesn’t stay small.
      </motion.p>
      
      <motion.h1 variants={textVariants} className="text-primary mb-8 text-3xl">
        It travels.
      </motion.h1>

      <motion.h1 variants={textVariants} className="text-primary">
        It affects people you’ll never meet.
      </motion.h1>

      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={onNext}
          className="glow-btn"
        >
          Continue
        </motion.button>
      )}
    </motion.div>
  );
}
