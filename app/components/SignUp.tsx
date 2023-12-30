"use client";

import React, { useState } from "react";
import "@/Home.css";
import { useRouter } from "next/navigation";
import Flex from "@/styles/Flex.styled";
import Input from "@/styles/Input.styled";
import Container from "@/styles/Container.styled";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Text from "@/styles/Text.styled";
import { SERVER_URL } from "@/utils/global";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const router = useRouter();

  function postDetails(pic: File | undefined) {
    setLoading(true);
    if (pic === undefined || pic === null) {
      setIsError("Please upload proper image");
    } else if (pic?.type === "image/jpeg" || pic?.type === "image/png" || pic?.type === "image/jpg") {
      const data = new FormData();
      data.append("file", pic);
      setUploadedImageName("Profile picture uploaded successfully");
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
      setIsError("Please upload proper image");
    }
  }

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !picture || !confirmPassword) {
      setLoading(false);
      if (!name) {
        setIsError("Please type your name");
      } else if (!email) {
        setIsError("Please type your email");
      } else if (!password) {
        setIsError("Please type your password");
      } else if (!confirmPassword) {
        setIsError("Please confirm your password");
      } else if (!picture) {
        setIsError("Please upload your picture");
      }
      return;
    }

    if (password != confirmPassword) {
      setLoading(false);
      setIsError("Password is not matching");
      return;
    }

    try {
      const url = `${SERVER_URL}/api/user/register`;
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
          router.push("/chats");
          setIsError("Signed Up Successfully");
          localStorage.setItem("userInfo", JSON.stringify(responseData));
        })
        .catch((error) => {
          setIsError("Email id already exist");
          // eslint-disable-next-line no-console
          console.error("Error:", error);
        });
    } catch (error) {
      setIsError("Something went wrong");
      // eslint-disable-next-line no-console
      console.error("Error:", error);
    } finally {
      setIsError("");
      setLoading(false);
    }
  };

  return (
    <Flex flexDirection="column" gap="24px" width="75%" mWidth="100%" as={"main"} className="sign-up">
      <Flex flexDirection="column" gap="12px">
        <Text
          fontSize="18px"
          fontWeight="400"
          color="#b60000"
          as={"h3"}
          $height="24px"
          className="signUpErrorMessage"
          data-cy="signUpErrorMessage"
          role="status"
          aria-live="polite"
        >
          {isError ? isError : ""}
        </Text>
        <Input
          value={name}
          placeholder="Type your name here"
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
          name="name"
          data-cy="signUpName"
          required
        />
      </Flex>
      <Input
        value={email}
        placeholder="Type your email here"
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
        name="email"
        data-cy="signUpEmail"
        required
      />

      <Container $position="relative">
        <Input
          value={password}
          placeholder="Type your password here"
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
          name="password"
          data-cy="signUpPassword"
          tabIndex={0}
          required
        />
        <Container
          cursor="pointer"
          $position="absolute"
          $right="12px"
          $bottom="8px"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={0}
          role="button"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowPassword(!showPassword);
            }
          }}
          aria-label="Click to see the password you entered."
          className="focus-outline"
        >
          {!showPassword ? <FaRegEye size={24} /> : <FaRegEyeSlash size={24} />}
        </Container>
      </Container>

      <Container $position="relative">
        <Input
          value={confirmPassword}
          placeholder="Type your password again"
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
          name="confirmPassword"
          data-cy="signUpConfirmPassword"
          required
        />
        <Container
          tabIndex={0}
          role="button"
          cursor="pointer"
          $position="absolute"
          $right="12px"
          $bottom="8px"
          onClick={() => setShowPassword(!showPassword)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowPassword(!showPassword);
            }
          }}
          aria-label="Click to see the password you entered second time."
          className="focus-outline"
        >
          {!showPassword ? <FaRegEye size={24} /> : <FaRegEyeSlash size={24} />}
        </Container>
      </Container>

      <label
        className="custom-file-upload  focus-outline"
        data-cy="signUpImageUploadLabel"
        tabIndex={0}
        aria-label="Upload your image here"
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            const inputElement = e.currentTarget.children[0] as HTMLInputElement;
            inputElement.click();
            if (inputElement && inputElement.files && inputElement.files.length > 0) {
              postDetails(inputElement.files[0]);
            }
          }
        }}
      >
        {uploadedImageName ? uploadedImageName : "Upload your image"}
        <Input
          placeholder="Upload your image here"
          $border="0"
          borderBottom="2px solid black"
          padding="0 0 12px 0"
          $fontSize="16px"
          $fontWeight="400"
          type="file"
          accept="image/*"
          name="imageUpload"
          onChange={(e) => {
            if (e.target && e.target.files && e.target.files.length > 0) {
              postDetails(e.target.files[0]);
            }
          }}
          width="100%"
          height="40px"
          data-cy="signUpImageUpload"
          required
        />
      </label>

      <Container
        width="100%"
        textAlign="center"
        hBackgroundColor="black"
        padding="8px 12px"
        cursor="pointer"
        onClick={submitHandler}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            submitHandler();
          }
        }}
        border="2px solid black"
        hColor="white"
        className="signUpSubmit focus-outline smoothBgAndColorTransition"
        data-cy="signUpSubmitButton"
        tabIndex={0}
        role="button"
        aria-label="Click to Sign Up the form."
      >
        <Text fontWeight="600" fontSize="18px">
          {loading ? "Loading" : "Sign Up"}
        </Text>
      </Container>
    </Flex>
  );
};

export default SignUp;
