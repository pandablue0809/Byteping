import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Container from "@/styles/Container.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";

const DarkLightModeButton = ({
  position,
  top,
  right,
  bg,
  hBg,
  iconSize
}: {
  position?: string;
  top?: string;
  right?: string;
  bg?: string;
  hBg?: string;
  iconSize?: number;
}) => {
  const { isDark, toggleDarkLightMode } = useContext(DarkLightModeContext)!;

  return (
    <Container
      width={iconSize ? `${iconSize + 16}px` : "40px"}
      height={iconSize ? `${iconSize + 16}px` : "40px"}
      padding="8px"
      backgroundColor={bg ? bg : Theme.colors.violet}
      borderRadius="12px"
      hBackgroundColor={hBg ? hBg : Theme.colors.lightViolet}
      cursor="pointer"
      $position={position ? position : "relative"}
      $top={top ? top : "0px"}
      $right={right ? right : "0px"}
      onClick={toggleDarkLightMode}
    >
      {isDark ? (
        <BsSun size={iconSize ? iconSize : 24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
      ) : (
        <BsMoonStars size={iconSize ? iconSize : 24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
      )}
    </Container>
  );
};

export default DarkLightModeButton;
