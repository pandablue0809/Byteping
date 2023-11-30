"use client";

import "./Home.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Flex from "./styles/Flex.styled";
import Text from "./styles/Text.styled";
import Container from "./styles/Container.styled";
import Theme from "./styles/Theme.styled";
import Link from "next/link";
import LoginContainer from "./components/LoginContainer";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      router.push("/chats");
    }
  }, [router]);

  return (
    <>
      <Flex
        as={"main"}
        height="100vh"
        padding="48px"
        mPadding="24px"
        className="hero-img"
        $position="relative"
        alignItems="center"
        justifyContent="flex-end"
        mJustifyContent="flex-start"
      >
        <Link href={"/"} className="hero-img-logo">
          <Text
            className="text-with-border"
            fontSize="2rem"
            mFontSize="1rem"
            fontWeight="900"
            letterSpacing="16px"
            color={Theme.colors.white}
          >
            BYTEPING
          </Text>
        </Link>
        <Container border="2px solid white" padding="48px" mPadding="24px" width="528px" mWidth="324px">
          <Text fontSize="3.5rem" mFontSize="32px" fontWeight="100" color={Theme.colors.white} letterSpacing="4px">
            IMPRESSIVE EXPERIENCES THAT DELIVER
          </Text>
        </Container>
      </Flex>
      <LoginContainer />
    </>
  );
};

export default Home;
