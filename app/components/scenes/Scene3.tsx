"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Scene3({ onNext, userName }: { onNext: () => void, userName: string }) {
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
    exit: { opacity: 0, scale: 1.05, transition: { duration: 1 } }
  } as const;

  const textVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 1.5, ease: "easeOut" } }
  } as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="scene-content relative z-10"
    >
      {/* Soft expanding glow pulse */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center z-[-1]">
        <motion.div
          className="w-full h-full max-w-2xl max-h-2xl rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(138,43,226,0.15) 0%, rgba(0,0,0,0) 70%)"
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          } as const}
        />
      </div>

      <motion.p variants={textVariants} className="text-secondary mb-4">
        So here’s the thing…
      </motion.p>
      
      <motion.h1 variants={textVariants} className="text-primary mb-12">
        You’re 18 now.
      </motion.h1>

      <motion.p variants={textVariants} className="text-secondary mb-2">
        Not just older…
      </motion.p>
      <motion.p variants={textVariants} className="text-primary mb-12" style={{fontSize: '2rem'}}>
        But responsible.
      </motion.p>

      <motion.p variants={textVariants} className="text-secondary mb-4">
        For the first time…
      </motion.p>
      <motion.h1 variants={textVariants} className="text-primary mb-12">
        What you choose actually matters.
      </motion.h1>

      <motion.p variants={textVariants} className="text-secondary mb-2">
        Not later.
      </motion.p>
      <motion.h1 variants={textVariants} className="text-primary text-4xl" style={{ textShadow: "0 0 30px rgba(138,43,226,0.8)" }}>
        Now.
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
