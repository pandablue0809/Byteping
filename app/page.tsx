"use client";

import "./Home.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Flex from "./styles/Flex.styled";
import Link from "next/link";
import LoginContainer from "./components/LoginContainer";
import Text from "./styles/Text.styled";
import Container from "./styles/Container.styled";
import Theme from "./styles/Theme.styled";
import ScrollArrow from "./components/ScrollArrow";
import WhatMakesItDifferent from "./components/WhatMakesItDifferent";

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
        <Link href={"/"} className="hero-img-logo focus-outline" aria-label="Home page link of Byteping">
          <svg className="company-logo" aria-hidden="true">
            <text x="50%" y="50%" dy=".32em" className="company-logo-text" data-cy="companyLogo" textAnchor="middle">
              Byteping
            </text>
          </svg>
        </Link>
        <Container border="2px solid white" padding="48px" mPadding="24px" width="528px" mWidth="312px" tabIndex={-1}>
          <Text
            fontSize="3.5rem"
            mFontSize="32px"
            fontWeight="100"
            color={Theme.colors.white}
            letterSpacing="4px"
            data-cy="companyMotto"
            role="hero text"
            aria-label="Company motto sentence"
            tabIndex={0}
            className="focus-outline"
          >
            IMPRESSIVE EXPERIENCES THAT DELIVER
          </Text>
        </Container>
        <ScrollArrow rotate="90deg" bottom="0" right="0" />
      </Flex>
      <WhatMakesItDifferent />
      <LoginContainer />
    </>
  );
};

export default Home;
