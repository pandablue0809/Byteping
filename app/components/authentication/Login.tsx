"use client";

import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function submitHandler() {
    // submit
  }

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
      <button onClick={() => submitHandler()}>Login</button>
      <button onClick={() => guestSubmitHandler()}>Guest User</button>
    </section>
  );
};

export default Login;
