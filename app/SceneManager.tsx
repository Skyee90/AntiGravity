"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Scene1 from "./components/scenes/Scene1";
import Scene2 from "./components/scenes/Scene2";
import Scene3 from "./components/scenes/Scene3";
import Scene4 from "./components/scenes/Scene4";
import Scene4a from "./components/scenes/Scene4a";
import Scene4b from "./components/scenes/Scene4b";
import Scene4c from "./components/scenes/Scene4c";
import Scene5 from "./components/scenes/Scene5";
import Scene6 from "./components/scenes/Scene6";
import Scene7 from "./components/scenes/Scene7";
import Scene8 from "./components/scenes/Scene8";

export default function SceneManager() {
  const [currentScene, setCurrentScene] = useState(0);
  const [userName, setUserName] = useState("");
  const [registerBranch, setRegisterBranch] = useState(false);

  const nextScene = () => {
    setCurrentScene(prev => prev + 1);
  };

  const handleScene4Next = (option?: string) => {
    if (option === "Register to vote") {
      setRegisterBranch(true);
    }
    nextScene();
  };

  const scenes = [
    <Scene1 key="scene1" onNext={nextScene} />,
    <Scene2 key="scene2" onNext={nextScene} setUserName={setUserName} userName={userName} />,
    <Scene3 key="scene3" onNext={nextScene} userName={userName} />,
    <Scene4 key="scene4" onNext={handleScene4Next} />,
    ...(registerBranch ? [
      <Scene4a key="scene4a" onNext={nextScene} />,
      <Scene4b key="scene4b" onNext={nextScene} />,
      <Scene4c key="scene4c" onNext={nextScene} />,
    ] : []),
    <Scene5 key="scene5" onNext={nextScene} />,
    <Scene6 key="scene6" onNext={nextScene} />,
    <Scene7 key="scene7" onNext={nextScene} />,
    <Scene8 key="scene8" onNext={nextScene} />
  ];

  return (
    <div className="scene-container">
      <AnimatePresence mode="wait">
        {scenes[currentScene]}
      </AnimatePresence>
    </div>
  );
}
