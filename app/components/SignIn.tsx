"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginSubmitHandler } from "@/utils/http";
import { ChatState } from "@/contexts/ChatProvider";
import Flex from "@/styles/Flex.styled";
import Input from "@/styles/Input.styled";
import Container from "@/styles/Container.styled";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Text from "@/styles/Text.styled";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = ChatState()!;
  const [isError, setIsError] = useState("");
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginSubmitHandler,
    onSuccess: (responseData) => {
      setUser(responseData);
      localStorage.setItem("userInfo", JSON.stringify(responseData));
      setIsError("Signed In Successfully");
      router.push("/chats");
    },
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.error("Login error:", err);
    }
  });

  const submitHandler = async () => {
    if (!email) {
      setIsError("Fill your email");
      return;
    }

    if (!password) {
      setIsError("Type your secret");
      return;
    }

    const data = { email, password };
    try {
      await mutateAsync({ data });
    } catch (error) {
      setIsError("Failed to sign in");
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
    <Flex flexDirection="column" gap="24px" width="75%" mWidth="100%" as={"main"} className="sign-in">
      <Flex flexDirection="column" gap="12px">
        <Text
          fontSize="18px"
          fontWeight="400"
          color="#b60000"
          as={"h3"}
          $height="24px"
          data-cy="signInErrorMessage"
          aria-live="polite"
          role="status"
        >
          {isError ? isError : ""}
        </Text>
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
          data-cy="signInEmail"
          tabIndex={0}
          required
        />
      </Flex>
      <Container $position="relative">
        <Input
          value={password}
          placeholder="Type your password here"
          type={showPassword ? "text" : "password"}
          padding="0 0 12px 0"
          $fontSize="16px"
          $fontWeight="400"
          $border="0"
          $outline="0"
          borderBottom="2px solid black"
          width="100%"
          height="40px"
          name="password"
          data-cy="signInPassword"
          tabIndex={0}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Container
          tabIndex={0}
          className="focus-outline"
          role="button"
          cursor="pointer"
          $position="absolute"
          $right="12px"
          $bottom="8px"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowPassword(!showPassword);
            }
          }}
          aria-label="Click to see the password you entered."
        >
          {!showPassword ? <FaRegEye size={24} aria-hidden="true" /> : <FaRegEyeSlash size={24} aria-hidden="true" />}
        </Container>
      </Container>
      <Container
        tabIndex={0}
        role="button"
        width="100%"
        textAlign="center"
        hBackgroundColor="black"
        padding="8px 12px"
        cursor="pointer"
        onClick={submitHandler}
        border="2px solid black"
        hColor="white"
        className="signInButton focus-outline"
        data-cy="signInSubmitButton"
        aria-label="Click to submit the Sign In credentials."
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            submitHandler();
          }
        }}
      >
        <Text fontWeight="600" fontSize="18px" tabIndex={-1}>
          {isPending ? "Submitting..." : "Login"}
        </Text>
      </Container>
      <Container
        tabIndex={0}
        role="button"
        width="100%"
        textAlign="center"
        hBackgroundColor="black"
        padding="8px 12px"
        cursor="pointer"
        onClick={guestSubmitHandler}
        border="2px solid black"
        hColor="white"
        className="guestPassword focus-outline"
        data-cy="signInGuestButton"
        aria-label="Click to get the Guest User credentials."
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            guestSubmitHandler();
          }
        }}
      >
        <Text fontWeight="600" fontSize="18px" tabIndex={-1}>
          Guest User
        </Text>
      </Container>
    </Flex>
  );
};

export default SignIn;
