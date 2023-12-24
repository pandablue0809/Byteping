"use client";

import "./Home.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Flex from "./styles/Flex.styled";
import Link from "next/link";
import LoginContainer from "./components/LoginContainer";
import Magneto from "./components/Magneto";

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
        <Magneto />
      </Flex>
      <LoginContainer />
    </>
  );
};

export default Home;
