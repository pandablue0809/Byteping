"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";

interface ParallaxProps {
  className?: string;
  children?: React.ReactNode;
  speed?: number;
  id?: string;
}

const Parallax = ({ className, children, speed = 1, id = "parallax" }: ParallaxProps) => {
  const trigger = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const y = window.innerWidth * speed * 0.1;
    const setY = gsap.quickSetter(target.current, "y", "px");
    timeline.current = gsap.timeline({
      scrollTrigger: {
        id: id,
        trigger: trigger.current,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (e) => {
          setY(e.progress * y);
        }
      }
    });
    return () => {
      timeline?.current?.kill();
    };
  }, [id, speed]);

  return (
    <div ref={trigger} className={className}>
      <div ref={target}>{children}</div>
    </div>
  );
};

export default Parallax;
