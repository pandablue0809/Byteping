"use client";

import Container from "@/styles/Container.styled";
import Theme from "@/styles/Theme.styled";
import React from "react";

const Home = () => {
  return (
    <Container
      backgroundColor={Theme.colors.violet}
      minHeight="100vh"
      padding={["64px", "64px", "64px", "64px"]}
      mPadding={["32px", "32px", "32px", "32px"]}
    ></Container>
  );
};

export default Home;
