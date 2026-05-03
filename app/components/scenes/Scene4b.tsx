"use client";

import { motion } from "framer-motion";

export default function Scene4b({ onNext }: { onNext: () => void }) {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="scene-content w-full max-w-lg mx-auto flex flex-col items-center relative z-10"
    >
      <motion.p variants={textVariants} className="text-secondary mb-4">
        Step 1
      </motion.p>
      <motion.h1 variants={textVariants} className="text-primary mb-12 text-2xl">
        Most states let you do this online. Takes about two minutes.
      </motion.h1>

      <motion.div variants={textVariants} className="w-full bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-md">
        <div className="space-y-6">
          <div className="flex flex-col gap-2 text-left">
            <label className="text-white/50 text-sm">Full Name (as it appears on ID)</label>
            <div className="h-12 bg-white/5 rounded-lg border border-white/10"></div>
          </div>
          <div className="flex flex-col gap-2 text-left">
            <label className="text-white/50 text-sm">ID Number / SSN</label>
            <div className="h-12 bg-white/5 rounded-lg border border-white/10 w-2/3"></div>
          </div>
        </div>
      </motion.div>

      <motion.button
        variants={textVariants}
        onClick={onNext}
        className="glow-btn w-full max-w-sm"
      >
        Submit Registration
      </motion.button>
    </motion.div>
  );
}
