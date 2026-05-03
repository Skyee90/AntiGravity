"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), { ssr: false });

export default function Scene4c({ onNext }: { onNext: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 1.0 }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.8 } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="scene-content w-full flex flex-col items-center relative z-10"
    >
      <div className="w-32 h-32 mb-8">
         {/* Success Checkmark Lottie */}
         <Player
            autoplay
            keepLastFrame
            src="https://raw.githubusercontent.com/LottieFiles/lottie-react/master/example/src/lf20_tijmpky4.json"
            style={{ height: '100%', width: '100%' }}
         />
      </div>

      <motion.h1 variants={textVariants} className="text-primary mb-4 text-3xl glow-text">
        Done.
      </motion.h1>
      <motion.p variants={textVariants} className="text-secondary text-xl">
        See? Not so scary.
      </motion.p>
    </motion.div>
  );
}
