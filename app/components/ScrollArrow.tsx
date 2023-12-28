import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import rightArrowWhiteSrc from "../../public/images/rightArrowWhite.json";
import trackArrowSrc from "../../public/images/trackArrow.json";
import Container from "@/styles/Container.styled";
import { useLenis } from "@studio-freight/react-lenis";

interface ScrollArrowProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  height?: string;
  width?: string;
  rotate?: string;
  scrollToId: string;
  rightArrowWhite?: boolean;
  trackArrow?: boolean;
  className?: string;
}

const ScrollArrow = ({
  top,
  bottom,
  left,
  right,
  rotate = "0deg",
  rightArrowWhite,
  trackArrow,
  scrollToId,
  height,
  width,
  className
}: ScrollArrowProps) => {
  const lenis = useLenis(() => {});

  const handleKBScroll = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      lenis.scrollTo(scrollToId, { lerp: 0.05 });
    }
  };

  const handleScroll = () => {
    lenis.scrollTo(scrollToId, { lerp: 0.05 });
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
      role="button"
      aria-label="arrow button to scroll down"
      cursor="pointer"
      onClick={handleScroll}
      onKeyDown={handleKBScroll}
      className={`focus-outline ${className}`}
    >
      {rightArrowWhite && (
        <Player
          autoplay
          loop
          src={rightArrowWhiteSrc}
          style={{ height: height, width: width }}
          className="rightArrowWhite"
        />
      )}
      {trackArrow && <Player autoplay loop src={trackArrowSrc} className="trackArrow" />}
    </Container>
  );
};

export default ScrollArrow;
