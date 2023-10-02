"use client";

import "./Home.css";
import Login from "@/components/authentication/Login";
import SignUp from "@/components/authentication/SignUp";
import { motion, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const { scrollY } = useScroll();
  const moveDown = useTransform(scrollY, [0, 200, 300, 500], [0, 200, 300, 500]);
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
