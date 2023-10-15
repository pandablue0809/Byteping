"use client";

import React, { createContext, useState, useEffect, useContext } from "react";

type TDarkMode = boolean;

type DarkLightModeContextType = {
  darkMode: TDarkMode | null;
  setDarkMode: React.Dispatch<React.SetStateAction<TDarkMode | null>>;
};

const DarkLightModeContext = createContext<DarkLightModeContextType | null>(null);

interface IDarkLightMode {
  children: React.ReactNode;
}

const DarkLightModeProvider = ({ children }: IDarkLightMode) => {
  const [darkMode, setDarkMode] = useState<TDarkMode | null>(false);

  useEffect(() => {
    const darkModeInfoString = localStorage.getItem("darkMode");
    let darkModeInfo;
    if (darkModeInfoString) {
      darkModeInfo = JSON.parse(darkModeInfoString);
      setDarkMode(darkModeInfo);
    }
    if (!darkModeInfo) {
      return;
    }
  }, [darkMode]);

  return <DarkLightModeContext.Provider value={{ darkMode, setDarkMode }}>{children}</DarkLightModeContext.Provider>;
};

export const DarkModeState = () => {
  return useContext(DarkLightModeContext);
};

export default DarkLightModeProvider;
