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
import Feature from "./components/Feature";

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
        id="container-1"
      >
        <Link href={"/"} className="hero-img-logo focus-outline" aria-label="Home page link of Byteping">
          <svg className="company-logo" aria-hidden="true">
            <text x="50%" y="50%" dy=".32em" className="company-logo-text" data-cy="companyLogo" textAnchor="middle">
              Byteping
            </text>
          </svg>
        </Link>
        <Container
          border="2px solid white"
          padding="48px"
          mPadding="24px"
          width="528px"
          mWidth="312px"
          tabIndex={-1}
          as={"aside"}
        >
          <Text
            as={"h1"}
            fontSize="3.5rem"
            mFontSize="32px"
            fontWeight="100"
            color={Theme.colors.white}
            letterSpacing="4px"
            data-cy="companyMotto"
            role="heading"
            aria-level={1}
            aria-label="Company motto sentence"
            tabIndex={0}
            className="focus-outline"
          >
            IMPRESSIVE EXPERIENCES THAT DELIVER
          </Text>
        </Container>
        <ScrollArrow
          rotate="90deg"
          bottom="0"
          right="0"
          rightArrowWhite
          scrollToId="#container-2"
          height="150px"
          width="150px"
        />
      </Flex>
      <WhatMakesItDifferent />
      <Feature
        headingText="Web accessibility"
        headingPara="I design web apps with a touch of magic, making them accessible to all by weaving the threads of inclusivity into every line of code."
        isAImage={false}
        videoSrc="https://www.youtube.com/embed/0jjR-d2XnzE?si=G8VoZiB3sVsoQ4Kc"
      />
      <Feature
        headingText="E2E Testing"
        headingPara="I write tests that embrace failure gracefully and ironically, struggle to craft ones that always succeed. It's a coding paradox."
        isAImage={false}
        videoSrc="https://www.youtube.com/embed/VBgdEkmweQQ?si=UGqnG__0caal4oX7"
      />
      <LoginContainer />
    </>
  );
};

export default Home;
