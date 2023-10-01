"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.log("Fill email and password");
      return;
    }

    try {
      const data = {
        email,
        password
      };

      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "post",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const responseData = await response.json();
        // eslint-disable-next-line no-console
        console.log("Response data:", responseData);
        localStorage.setItem("userInfo", JSON.stringify(responseData));
        router.push("/chats");
      } else {
        if (response.status === 401) {
          // eslint-disable-next-line no-console
          console.error("Authentication failed: Invalid email or password");
        } else {
          // eslint-disable-next-line no-console
          console.error("Authentication failed: Server error");
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error:", error);
    } finally {
      setLoading(false);
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
      <button onClick={submitHandler}>{loading ? "Loading" : "Login"}</button>
      <button onClick={guestSubmitHandler}>Guest User</button>
    </section>
  );
};

export default Login;
