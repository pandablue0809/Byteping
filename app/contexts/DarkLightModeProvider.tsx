"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";

export const DarkLightModeContext = createContext<{ isDark: boolean; toggleDarkLightMode: () => void } | undefined>(
  undefined
);

interface DarkLightModeProviderProps {
  children: ReactNode;
}

const DarkLightModeProvider: React.FC<DarkLightModeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkLightMode = () => {
    localStorage.setItem("isDark", JSON.stringify(!isDark));
    setIsDark(!isDark);
  };

  useEffect(() => {
    const isLocalDark = localStorage.getItem("isDark") === "true" || null;
    if (isLocalDark) {
      setIsDark(isLocalDark);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }
  }, []);

  return (
    <DarkLightModeContext.Provider value={{ isDark, toggleDarkLightMode }}>{children}</DarkLightModeContext.Provider>
  );
};

export default DarkLightModeProvider;
