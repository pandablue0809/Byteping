"use client";

import React from "react";
import Container from "@/styles/Container.styled";
import Theme from "@/styles/Theme.styled";
import Navbar from "@/components/Navbar";
import ChatBox from "@/components/ChatBox";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Container as={motion.main} backgroundColor={Theme.colors.violet} minHeight="100vh" padding="48px" mPadding="24px">
      <Navbar />
      <ChatBox />
    </Container>
  );
};

export default Home;
