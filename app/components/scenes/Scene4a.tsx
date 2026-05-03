"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), { ssr: false });

export default function Scene4a({ onNext }: { onNext: () => void }) {
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
      <div className="w-24 h-24 mb-8">
         {/* Calm Breathing/Meditation Lottie */}
         <Player
            autoplay
            loop
            src="https://raw.githubusercontent.com/LottieFiles/lottie-react/master/example/src/lf20_tkwz8nxd.json"
            style={{ height: '100px', width: '100px' }}
         />
      </div>

      <motion.h1 variants={textVariants} className="text-primary mb-4 text-3xl">
        Take a breath.
      </motion.h1>
      <motion.p variants={textVariants} className="text-secondary mb-8 text-xl">
        It’s easier than you think.
      </motion.p>
      <motion.p variants={textVariants} className="text-secondary text-lg">
        You just need your ID. Let's walk through it together.
      </motion.p>
    </motion.div>
  );
}
