"use client";

import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Theme from "@/styles/Theme.styled";
import React, { useContext } from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ height, backgroundColor }: { height?: string; backgroundColor?: string }) => {
  const { isDark } = useContext(DarkLightModeContext)!;

  const divStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: "100%",
    backgroundColor: `${backgroundColor ? backgroundColor : isDark ? Theme.colors.black : Theme.colors.white}`,
    borderRadius: "4px"
  };

  return (
    <div style={divStyle as React.CSSProperties}>
      <HashLoader size={100} color={isDark ? Theme.colors.white : Theme.colors.black} />
    </div>
  );
};

export default Loader;
