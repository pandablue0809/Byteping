import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Arrow from "../../public/images/rightArrowWhite.json";
import Container from "@/styles/Container.styled";
import { useLenis } from "@studio-freight/react-lenis";

interface ScrollArrowProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate?: string;
}

const ScrollArrow = ({ top, bottom, left, right, rotate = "0deg" }: ScrollArrowProps) => {
  const lenis = useLenis(() => {});

  const handleKBScroll = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      lenis.scrollTo("#container-2", { lerp: 0.05 });
    }
  };

  const handleScroll = () => {
    lenis.scrollTo("#container-2", { lerp: 0.05 });
  };

  return (
    <Container
      style={{ transform: `rotate(${rotate})`, zIndex: 0 }}
      tabIndex={0}
      $position="absolute"
      $top={top}
      $bottom={bottom}
      $right={right}
      $left={left}
      cursor="pointer"
      onClick={handleScroll}
      onKeyDown={handleKBScroll}
      className="focus-outline"
    >
      <Player autoplay loop src={Arrow} style={{ height: "150px", width: "150px" }}></Player>
    </Container>
  );
};

export default ScrollArrow;
