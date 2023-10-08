"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, useAnimate, stagger, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { loginSubmitHandler } from "@/utils/http";
import { ChatState } from "@/context/ChatProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [scope, animate] = useAnimate();
  const { setUser } = ChatState()!;
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginSubmitHandler,
    onSuccess: (responseData) => {
      // eslint-disable-next-line no-console
      console.log("Response data:", responseData);
      setUser(responseData);
      localStorage.setItem("userInfo", JSON.stringify(responseData));
      router.push("/chats");
    },
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.error("Login error:", err);
    }
  });

  const submitHandler = async () => {
    if (!email || !password) {
      animate("input", { x: [-20, 0, 20, 0] }, { type: "spring", delay: stagger(0.1) });
      // eslint-disable-next-line no-console
      console.log("Fill email and password");
      return;
    }

    const data = { email, password };
    try {
      await mutateAsync({ data });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error:", error);
      return;
    }
  };

  function guestSubmitHandler() {
    setEmail("arjunan@gmail.com");
    setPassword("123456");
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        layout
        className="display-flex-col-login"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        exit="hidden"
        variants={{ hidden: { opacity: 0, y: 20 } }}
        transition={{ type: "spring" }}
        ref={scope}
      >
        <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <div className="display-flex-row">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={() => setShowPassword((prev: boolean) => !prev)}>{showPassword ? "Hide" : "Show"}</button>
        </div>
        <button onClick={submitHandler}>{isPending ? "Submitting..." : "Login"}</button>
        <motion.button
          onClick={guestSubmitHandler}
          whileHover={{ scale: [0.8, 1.2, 1], backgroundColor: "#0ff", color: "#fff" }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          Guest User
        </motion.button>
      </motion.section>
    </AnimatePresence>
  );
};

export default Login;
