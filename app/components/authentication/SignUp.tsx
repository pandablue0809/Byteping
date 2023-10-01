"use client";

import React, { useState } from "react";
import "@/Home.css";
import { useRouter } from "next/navigation";

const SignUp = () => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [name, setName] = useState("");
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState("");
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [picture, setPicture] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function postDetails(pic: File | undefined) {
    setLoading(true);
    if (pic === undefined || pic === null) {
      // eslint-disable-next-line no-console
      console.log("Please upload an image");
    } else if (pic?.type === "image/jpeg" || pic?.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "byteping");
      data.append("cloud_name", "dx21sien7");
      fetch("https://api.cloudinary.com/v1_1/dx21sien7/image/upload", {
        method: "post",
        body: data
      })
        .then((res) => res.json())
        .then((resData) => {
          setPicture(resData.url.toString());
          // eslint-disable-next-line no-console
          console.log(resData.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log("Please upload an image", err);
          setLoading(false);
        });
    } else {
      // eslint-disable-next-line no-console
      console.log("Please upload an image");
    }
  }

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !picture || !confirmPassword) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.log("Fill all the fields");
      return;
    }

    if (password != confirmPassword) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.log("Password is not matching");
      return;
    }

    try {
      const url = "http://localhost:5000/api/user/register";
      const data = {
        name,
        email,
        password,
        picture
      };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((responseData) => {
          // eslint-disable-next-line no-console
          console.log("Response data:", responseData);
          router.push("/chats");
          localStorage.setItem("userInfo", JSON.stringify(responseData));
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("Error:", error);
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="display-flex-col-login">
      <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <div className="display-flex-row">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setShowPassword((prev: boolean) => !prev)}>{showPassword ? "Hide" : "Show"}</button>
      </div>
      <div className="display-flex-row">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={() => setShowPassword((prev: boolean) => !prev)}>{showPassword ? "Hide" : "Show"}</button>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target && e.target.files && e.target.files.length > 0) {
            postDetails(e.target.files[0]);
          }
        }}
      />

      <button onClick={submitHandler}>{loading ? "loading" : "Sign Up"}</button>
    </section>
  );
};

export default SignUp;
