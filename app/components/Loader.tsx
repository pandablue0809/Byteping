"use client";

import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Theme from "@/styles/Theme.styled";
import React, { useContext } from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  const { isDark } = useContext(DarkLightModeContext)!;

  const divStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    backgroundColor: `${isDark ? Theme.colors.black : Theme.colors.white}`
  };

  return (
    <div style={divStyle as React.CSSProperties}>
      <HashLoader size={100} color={Theme.colors.violet} />
    </div>
  );
};

export default Loader;
