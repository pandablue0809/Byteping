"use client";

import React from "react";
import GlobalStyle from "@/styles/Global.styled";
import Theme from "@/styles/Theme.styled";
import { ThemeProvider } from "styled-components";

interface StyledComponentsProviderProps {
  children: React.ReactNode;
}

const StyledComponentsProvider = ({ children }: StyledComponentsProviderProps) => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default StyledComponentsProvider;
