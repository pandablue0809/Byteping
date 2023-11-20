"use client";

import "./Home.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/Login/Login";
import SignUp from "@/components/SignUp/SignUp";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      router.push("/chats");
    }
  }, [router]);
  return (
    <main>
      <h1>BytePing</h1>
      <section className="login-signup-container">
        <Login />
        <SignUp />
      </section>
    </main>
  );
};

export default Home;
