import React from "react";
import "./../Home.css";
import Flex from "@/styles/Flex.styled";
import ScrollArrow from "./ScrollArrow";

const WhatMakesItDifferent = () => {
  return (
    <Flex
      backgroundColor="white"
      height="100vh"
      $position="relative"
      style={{ overflow: "hidden" }}
      id="container-2"
      padding="48px"
      mPadding="24px"
    >
      <ScrollArrow bottom="0" right="0" />
    </Flex>
  );
};

export default WhatMakesItDifferent;
