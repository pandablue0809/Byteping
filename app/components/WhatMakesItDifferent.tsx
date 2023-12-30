import React, { useEffect } from "react";
import "./../Home.css";
import Flex from "@/styles/Flex.styled";
import ScrollArrow from "./ScrollArrow";
import Container from "@/styles/Container.styled";
import gsap from "gsap";
import SplitTextJS from "split-text-js";
import bubbleLottieBg from "../../public/images/bubbleLottieBg.json";
import { Player } from "@lottiefiles/react-lottie-player";
import Magneto from "./Magneto";

const WhatMakesItDifferent = () => {
  useEffect(() => {
    const titles = gsap.utils.toArray(".ThreeDText");
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });
    titles.forEach((title) => {
      const splitTitle = new SplitTextJS(title);
      // const splitTitle = new SplitText(title, { type: 'chars' });
      tl.from(
        splitTitle.chars,
        {
          opacity: 0,
          y: 80,
          rotateX: -90,
          stagger: 0.02
        },
        "<"
      ).to(
        splitTitle.chars,
        {
          opacity: 0,
          y: -80,
          rotateX: 90,
          stagger: 0.02
        },
        "<1"
      );
    });
  }, []);

  return (
    <Flex
      backgroundColor="white"
      height="100vh"
      $position="relative"
      style={{ overflow: "hidden" }}
      id="container-2"
      padding="48px"
      mPadding="24px"
      alignItems="center"
      justifyContent="center"
      className="whatMakesItDifferent"
      as={"section"}
    >
      <Player autoplay loop src={bubbleLottieBg} className="bubbleLottieBg" />
      <Flex as={"article"} tabIndex={-1}>
        <Container
          className="textWrapper focus-outline"
          as={"main"}
          tabIndex={0}
          aria-label="What makes Byteping different?"
          $position="relative"
        >
          <h2 className="ThreeDText">WHAT</h2>
          <h2 className="ThreeDText">MAKES</h2>
          <h2 className="ThreeDText">BYTEPING</h2>
          <h2 className="ThreeDText">DIFFERENT</h2>
          <h2 className="ThreeDText">?</h2>
        </Container>
      </Flex>
      <ScrollArrow
        bottom="0"
        right="0"
        trackArrow
        scrollToId="#container-3"
        width="150px"
        height="150px"
        className="trackArrowContainer"
      />
      <Magneto />
    </Flex>
  );
};

export default WhatMakesItDifferent;
