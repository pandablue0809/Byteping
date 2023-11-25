"use client";

import "./Home.css";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/Login/Login";
import SignUp from "@/components/SignUp/SignUp";
import Flex from "./styles/Flex.styled";
import Text from "./styles/Text.styled";
import Container from "./styles/Container.styled";
import Theme from "./styles/Theme.styled";
import { DarkLightModeContext } from "./contexts/DarkLightModeProvider";

const Home = () => {
  const router = useRouter();
  const { isDark } = useContext(DarkLightModeContext)!;

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      router.push("/chats");
    }
  }, [router]);

  return (
    <Container>
      <Flex
        height="100vh"
        padding="48px"
        mPadding="24px"
        className="hero-img"
        $position="relative"
        alignItems="center"
        justifyContent="flex-end"
        mJustifyContent="flex-start"
      >
        <Text
          className="hero-img-logo"
          fontSize="2rem"
          mFontSize="1rem"
          fontWeight="900"
          letterSpacing="16px"
          color={Theme.colors.white}
        >
          BYTEPING
        </Text>
        <Container border="2px solid white" padding="48px" mPadding="24px">
          <Text fontSize="3.5rem" fontWeight="100" color={Theme.colors.white} letterSpacing="4px">
            IMPRESSIVE EXPERIENCES THAT DELIVER
          </Text>
        </Container>
      </Flex>
      <Flex backgroundColor="#FBBC05" height="100vh">
        Features
      </Flex>
      <Flex
        backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
        height="100vh"
        padding="48px"
        mPadding="24px"
        justifyContent="center"
        alignItems="center"
      >
        <Flex mFlexDirection="column" gap="32px">
          <Login />
          <SignUp />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Home;
