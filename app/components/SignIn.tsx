"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
      router.push("/chats");
    },
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.error("Login error:", err);
    }
  });

  const submitHandler = async () => {
    if (!email || !password) {
      setIsError("Fill email & password");
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
        <Text fontSize="18px" fontWeight="400" color="#b60000" as={"h3"} $height="24px">
          {isError ? isError : ""}
        </Text>
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
          name="email"
        />
      </Flex>
      <Container $position="relative">
        <Input
          value={password}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          padding="0 0 12px 0"
          $fontSize="16px"
          $fontWeight="400"
          $outline="0"
          $border="0"
          borderBottom="2px solid black"
          width="100%"
          height="40px"
          name="password"
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
      <Container
        width="100%"
        textAlign="center"
        hBackgroundColor="black"
        padding="8px 12px"
        cursor="pointer"
        onClick={submitHandler}
        border="2px solid black"
        hColor="white"
        className="signInButton"
      >
        <Text fontWeight="600" fontSize="18px">
          {isPending ? "Submitting..." : "Login"}
        </Text>
      </Container>
      <Container
        width="100%"
        textAlign="center"
        hBackgroundColor="black"
        padding="8px 12px"
        cursor="pointer"
        onClick={guestSubmitHandler}
        border="2px solid black"
        hColor="white"
        className="guestPassword"
      >
        <Text fontWeight="600" fontSize="18px">
          Guest User
        </Text>
      </Container>
    </Flex>
  );
};

export default SignIn;
