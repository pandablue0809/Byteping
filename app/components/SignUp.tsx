"use client";

import React, { useState } from "react";
import "@/Home.css";
import { useRouter } from "next/navigation";
import Flex from "@/styles/Flex.styled";
import Input from "@/styles/Input.styled";
import Container from "@/styles/Container.styled";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Text from "@/styles/Text.styled";

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
    <Flex flexDirection="column" gap="24px" width="75%" mWidth="100%">
      <Input
        value={name}
        placeholder="Your name goes here..."
        $outline="0"
        $border="0"
        borderBottom="2px solid black"
        padding="0 0 12px 0"
        $fontSize="16px"
        $fontWeight="400"
        type="text"
        onChange={(e) => setName(e.target.value)}
        width="100%"
        height="40px"
      />
      <Input
        value={email}
        placeholder="Your mail goes here..."
        $outline="0"
        $border="0"
        borderBottom="2px solid black"
        padding="0 0 12px 0"
        $fontSize="16px"
        $fontWeight="400"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        width="100%"
        height="40px"
      />

      <Container $position="relative">
        <Input
          value={password}
          placeholder="Your secret goes here..."
          $outline="0"
          $border="0"
          borderBottom="2px solid black"
          padding="0 0 12px 0"
          $fontSize="16px"
          $fontWeight="400"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          width="100%"
          height="40px"
        />
        <Container
          cursor="pointer"
          $position="absolute"
          $right="12px"
          $bottom="8px"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <FaRegEye size={24} /> : <FaRegEyeSlash size={24} />}
        </Container>
      </Container>

      <Container $position="relative">
        <Input
          value={confirmPassword}
          placeholder="Confirm you secret"
          $outline="0"
          $border="0"
          borderBottom="2px solid black"
          padding="0 0 12px 0"
          $fontSize="16px"
          $fontWeight="400"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setConfirmPassword(e.target.value)}
          width="100%"
          height="40px"
        />
        <Container
          cursor="pointer"
          $position="absolute"
          $right="12px"
          $bottom="8px"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <FaRegEye size={24} /> : <FaRegEyeSlash size={24} />}
        </Container>
      </Container>

      <label className="custom-file-upload">
        Upload your image
        <Input
          placeholder="Your secret goes here..."
          $outline="0"
          $border="0"
          borderBottom="2px solid black"
          padding="0 0 12px 0"
          $fontSize="16px"
          $fontWeight="400"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target && e.target.files && e.target.files.length > 0) {
              postDetails(e.target.files[0]);
            }
          }}
          width="100%"
          height="40px"
        />
      </label>

      <Container
        width="100%"
        textAlign="center"
        hBackgroundColor="black"
        padding="8px 12px"
        cursor="pointer"
        onClick={submitHandler}
        border="2px solid black"
        hColor="white"
      >
        <Text fontWeight="600" fontSize="18px">
          {loading ? "loading" : "Sign Up"}
        </Text>
      </Container>
    </Flex>
  );
};

export default SignUp;
