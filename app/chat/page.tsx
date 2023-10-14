"use client";

import React from "react";
import Container from "@/styles/Container.styled";
import Theme from "@/styles/Theme.styled";
import Navbar from "@/components/Navbar";
import ChatBox from "@/components/ChatBox";

const Home = () => {
  return (
    <Container as={"main"} backgroundColor={Theme.colors.violet} minHeight="100vh" padding="48px" mPadding="24px">
      <Navbar />
      <ChatBox />
    </Container>
  );
};

export default Home;
