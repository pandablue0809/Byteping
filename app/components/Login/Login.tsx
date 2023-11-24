"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginSubmitHandler } from "@/utils/http";
import { ChatState } from "@/contexts/ChatProvider";
import Flex from "@/styles/Flex.styled";
import Input from "@/styles/Input.styled";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Theme from "@/styles/Theme.styled";
import Container from "@/styles/Container.styled";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Text from "@/styles/Text.styled";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = ChatState()!;
  const router = useRouter();
  const { isDark } = useContext(DarkLightModeContext)!;

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
    <Flex flexDirection="column" gap="16px">
      <Input
        value={email}
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        height="48px"
        borderRadius="4px"
        backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
        padding="4px 12px"
        textColor={isDark ? Theme.colors.white : Theme.colors.black}
        $pTextColor={isDark ? Theme.colors.white : Theme.colors.black}
        $pFontSize="16px"
        $pFontWeight="400"
        $pLineHeight="150%"
        $outline="0"
        $border={`1px solid ${isDark ? Theme.colors.white : Theme.colors.black}`}
      />
      <Container $position="relative">
        <Input
          value={password}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          height="40px"
          borderRadius="4px"
          backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
          padding="4px 40px 4px 12px"
          textColor={isDark ? Theme.colors.white : Theme.colors.black}
          $pTextColor={isDark ? Theme.colors.white : Theme.colors.black}
          $pFontSize="16px"
          $pFontWeight="400"
          $pLineHeight="150%"
          $outline="0"
          $border={`1px solid ${isDark ? Theme.colors.white : Theme.colors.black}`}
        />
        <Container
          $position="absolute"
          $top="calc(50% - 12px)"
          $right="12px"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? (
            <FaRegEye size={24} color={isDark ? Theme.colors.black : Theme.colors.white} />
          ) : (
            <FaRegEyeSlash size={24} color={isDark ? Theme.colors.black : Theme.colors.white} />
          )}
        </Container>
      </Container>
      <Container
        width="100%"
        backgroundColor={Theme.colors.violet}
        hBackgroundColor={Theme.colors.lightViolet}
        textAlign="center"
        padding="8px 12px"
        borderRadius="4px"
        cursor="pointer"
        onClick={submitHandler}
      >
        <Text color={isDark ? Theme.colors.black : Theme.colors.white}>{isPending ? "Submitting..." : "Login"}</Text>
      </Container>
      <Container
        width="100%"
        backgroundColor={Theme.colors.violet}
        hBackgroundColor={Theme.colors.lightViolet}
        textAlign="center"
        padding="8px 12px"
        borderRadius="4px"
        cursor="pointer"
        onClick={guestSubmitHandler}
      >
        <Text color={isDark ? Theme.colors.black : Theme.colors.white}>Guest User</Text>
      </Container>
    </Flex>
  );
};

export default Login;
