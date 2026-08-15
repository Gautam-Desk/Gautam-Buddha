import { createContext, useContext, useState, useEffect } from "react";

const AnimationContext = createContext({
  animMode: "fluid", // 'fluid' | 'subtle' | 'still'
  setAnimMode: () => {},
  cycleAnimMode: () => {},
});

export function AnimationProvider({ children }) {
  const [animMode, setAnimMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("buddha_anim_mode") || "fluid";
    }
    return "fluid";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("buddha_anim_mode", animMode);
    }
  }, [animMode]);

  const cycleAnimMode = () => {
    setAnimMode((prev) => {
      if (prev === "fluid") return "subtle";
      if (prev === "subtle") return "still";
      return "fluid";
    });
  };

  return (
    <AnimationContext.Provider value={{ animMode, setAnimMode, cycleAnimMode }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  return useContext(AnimationContext);
}
