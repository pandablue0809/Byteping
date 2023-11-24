"use client";

import "./Home.css";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/Login/Login";
import SignUp from "@/components/SignUp/SignUp";
import Flex from "./styles/Flex.styled";
import Text from "./styles/Text.styled";
import Container from "./styles/Container.styled";
import Theme from "./styles/Theme.styled";
import DarkLightModeButton from "./components/DarkLightModeButton";
import { DarkLightModeContext } from "./contexts/DarkLightModeProvider";

const Home = () => {
  const router = useRouter();
  const [heroOneBorderRadius, setHeroOneBorderRadius] = useState("0");
  const { isDark } = useContext(DarkLightModeContext)!;

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      router.push("/chats");
    }
  }, [router]);

  return (
    <Container>
      <DarkLightModeButton
        position="absolute"
        top={"32px"}
        right={"32px"}
        bg={Theme.colors.green}
        hBg={Theme.colors.green}
        iconSize={32}
      />
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        backgroundColor={Theme.colors.green}
        borderRadius={heroOneBorderRadius}
        onScroll={() => setHeroOneBorderRadius("0 0 0 100%")}
      >
        <Text
          fontSize="5.5rem"
          mFontSize="2rem"
          fontWeight="900"
          fontStyle="italic"
          letterSpacing="16px"
          color={isDark ? Theme.colors.black : Theme.colors.white}
        >
          BYTEPING
        </Text>
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
