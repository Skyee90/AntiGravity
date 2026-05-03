"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Scene1({ onNext }: { onNext: () => void }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.5,
      },
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
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.1,
              boxShadow: "0 0 10px 2px rgba(255,255,255,0.3)"
            }}
            animate={{
              y: [0, -100],
              opacity: [0, Math.random() * 0.5 + 0.1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <motion.p variants={textVariants} className="text-secondary mb-4">
        Hey…
      </motion.p>
      <motion.p variants={textVariants} className="text-secondary mb-12">
        Pause for a second.
      </motion.p>
      
      <motion.h1 variants={textVariants} className="text-primary">
        Today isn’t just another day.
      </motion.h1>
      <motion.h1 variants={textVariants} className="text-primary mb-12">
        You just turned 18.
      </motion.h1>
      
      <motion.p variants={textVariants} className="text-secondary mb-4">
        That might not feel like much yet…
      </motion.p>
      <motion.p variants={textVariants} className="text-secondary">
        But it changes something.
      </motion.p>

      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={onNext}
          className="glow-btn"
        >
          Start
        </motion.button>
      )}
    </motion.div>
  );
}
