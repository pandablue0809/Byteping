"use client";

import "./Home.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Login from "@/components/Login/Login";
import SignUp from "@/components/SignUp/SignUp";

const Home = () => {
  const { scrollY } = useScroll();
  const moveDown = useTransform(scrollY, [0, 200, 300, 500], [0, 200, 300, 500]);
  const router = useRouter();

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      router.push("/chats");
    }
  }, [router]);
  return (
    <main>
      <motion.h1 style={{ y: moveDown }}>BytePing</motion.h1>
      <section className="login-signup-container">
        <Login />
        <SignUp />
      </section>
    </main>
  );
};

export default Home;
