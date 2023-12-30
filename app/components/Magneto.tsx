import React, { useRef } from "react";
import { Elastic, Power4, gsap } from "gsap";
import Text from "@/styles/Text.styled";

const Magneto = () => {
  const magneto = useRef<HTMLButtonElement>(null);
  const magnetoText = useRef<HTMLSpanElement>(null);

  const activateMagneto = (event: React.MouseEvent<HTMLButtonElement>) => {
    const boundBox = magneto?.current?.getBoundingClientRect();
    const magnetoStrength = 40;
    const magnetoTextStrength = 80;
    const newX = (event.clientX - (boundBox?.left || 0)) / (magneto?.current?.offsetWidth || 1) - 0.5;
    const newY = (event.clientY - (boundBox?.top || 0)) / (magneto?.current?.offsetHeight || 1) - 0.5;
    gsap.to(magneto.current, {
      duration: 1,
      x: newX * magnetoStrength,
      y: newY * magnetoStrength,
      ease: Power4.easeOut
    });
    gsap.to(magnetoText.current, {
      duration: 1,
      x: newX * magnetoTextStrength,
      y: newY * magnetoTextStrength,
      ease: Power4.easeOut
    });
  };

  const resetMagneto = () => {
    gsap.to(magneto.current, {
      duration: 1,
      x: 0,
      y: 0,
      ease: Elastic.easeOut
    });
    gsap.to(magnetoText.current, {
      duration: 1,
      x: 0,
      y: 0,
      ease: Elastic.easeOut
    });
  };

  return (
    <button ref={magneto} className="magneto" onMouseMove={activateMagneto} onMouseLeave={resetMagneto} tabIndex={-1}>
      <Text
        as={"span"}
        ref={magnetoText}
        className="focus-outline magnetoText"
        fontSize="1rem"
        fontWeight="500"
        letterSpacing="8px"
        data-cy="companyMotto"
        role="hero text"
        aria-label="Company motto sentence"
        tabIndex={0}
      >
        CATCH ME
      </Text>
    </button>
  );
};

export default Magneto;
