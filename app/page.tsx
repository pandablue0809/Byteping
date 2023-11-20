"use client";

import "./Home.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/Login/Login";
import SignUp from "@/components/SignUp/SignUp";
import Flex from "./styles/Flex.styled";
import Text from "./styles/Text.styled";
import Container from "./styles/Container.styled";
import Theme from "./styles/Theme.styled";

const Home = () => {
  const router = useRouter();
  const [heroOneBorderRadius, setHeroOneBorderRadius] = useState("0");

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      router.push("/chats");
    }
  }, [router]);

  return (
    <Container>
      <Flex
        className="home-hero"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        backgroundColor="#34a853"
        borderRadius={heroOneBorderRadius}
        onScroll={() => setHeroOneBorderRadius("0 0 0 100%")}
      >
        <Text fontSize="5.5rem" fontWeight="900" fontStyle="italic" letterSpacing="16px" color={Theme.colors.black}>
          BYTEPING
        </Text>
      </Flex>
      <Flex backgroundColor="#FBBC05" height="100vh">
        Features
      </Flex>
      <Flex backgroundColor={Theme.colors.violet} height="100vh">
        Features
      </Flex>
      <Flex backgroundColor="#4285F4" height="100vh">
        Features
      </Flex>
      <Flex backgroundColor="#EA4335" height="100vh">
        Features
      </Flex>
      <section className="login-signup-container">
        <Login />
        <SignUp />
      </section>
    </Container>
  );
};

export default Home;
