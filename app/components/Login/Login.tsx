"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginSubmitHandler } from "@/utils/http";
import { ChatState } from "@/contexts/ChatProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = ChatState()!;
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginSubmitHandler,
    onSuccess: (responseData) => {
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
      // console.log("Fill email and password");
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
    <section className="display-flex-col-login">
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
      <button onClick={guestSubmitHandler}>Guest User</button>
    </section>
  );
};

export default Login;
