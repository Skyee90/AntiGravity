"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Scene8({ onNext }: { onNext: () => void }) {
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFinal(true);
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
      {/* Soft fading particles for closure */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
            }}
            initial={{ 
              x: (Math.random() - 0.5) * 200, 
              y: (Math.random() - 0.5) * 200, 
              opacity: 0 
            }}
            animate={{ 
              x: (Math.random() - 0.5) * 600, 
              y: (Math.random() - 0.5) * 600, 
              opacity: [0, 0.5, 0] 
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "easeOut" 
            } as const}
          />
        ))}
      </div>

      <motion.p variants={textVariants} className="text-secondary mb-4">
        So yeah…
      </motion.p>
      <motion.p variants={textVariants} className="text-secondary mb-12">
        You made it this far.
      </motion.p>
      
      <motion.p variants={textVariants} className="text-secondary mb-8">
        Most people don’t even think about this stuff.
      </motion.p>
      <motion.p variants={textVariants} className="text-secondary mb-12">
        But you did.
      </motion.p>
      
      <motion.h1 variants={textVariants} className="text-primary mb-12 text-3xl">
        And that already changes something.
      </motion.h1>

      {showFinal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mt-8 flex flex-col items-center"
        >
          <p className="text-secondary mb-4">What you do next…</p>
          <h1 className="text-primary text-5xl tracking-tight" style={{ textShadow: "0 0 40px rgba(138,43,226,0.9)" }}>
            That’s the part that actually matters.
          </h1>
          
          <button 
            onClick={() => window.location.reload()}
            className="mt-16 text-white/40 hover:text-white/80 text-sm transition-colors border-b border-transparent hover:border-white/50 pb-0.5"
          >
            Experience Again
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
