"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import React from "react";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
