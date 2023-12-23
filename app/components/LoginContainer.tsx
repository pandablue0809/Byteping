import Flex from "@/styles/Flex.styled";
import Theme from "@/styles/Theme.styled";
import React, { useState } from "react";
import SignUp from "./SignUp";
import "../Home.css";
import Text from "@/styles/Text.styled";
import Container from "@/styles/Container.styled";
import SignIn from "./SignIn";

const LoginContainer = () => {
  const [signIn, setSignIn] = useState(true);

  const handleRegisterLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      setSignIn(!signIn);
    }
  };

  return (
    <Flex
      as={"main"}
      backgroundColor={Theme.colors.white}
      height="100vh"
      padding="48px"
      mPadding="24px"
      justifyContent="center"
      alignItems="center"
    >
      <Container width="50%" padding="48px" mPadding="0" mWidth="100%" as={"section"} className="signin-signup">
        <Text
          fontSize="30px"
          fontWeight="500"
          margin="0 0 12px 0"
          as={"h2"}
          data-cy="signInAndUpTitle"
          tabIndex={0}
          className="focus-outline"
          aria-label={signIn ? "Sign In" : "Sign Up"}
        >
          {signIn ? "Sign In" : "Sign Up"}
        </Text>
        <Text fontSize="16px" fontWeight="400" margin="0 0 4px 0" as={"p"}>
          {signIn ? "If you don’t have an account" : "If you already have an account"}
        </Text>
        <Text fontSize="16px" fontWeight="400" margin="0 0 12px 0" as={"p"}>
          You can{" "}
          {signIn ? (
            <span
              onKeyDown={handleRegisterLogin}
              onClick={() => setSignIn(!signIn)}
              className="dark-blue-span focus-outline"
              data-cy="registerHereButton"
              aria-label="If you don’t have an account, Click here to Register."
              tabIndex={0}
            >
              Register here !
            </span>
          ) : (
            <span
              onKeyDown={handleRegisterLogin}
              onClick={() => setSignIn(!signIn)}
              className="dark-blue-span focus-outline"
              data-cy="loginHereButton"
              aria-label="If you already have an account, Click here to Sign In."
              tabIndex={0}
            >
              Login here !
            </span>
          )}
        </Text>
        {signIn ? <SignIn /> : <SignUp />}
      </Container>
      <Flex
        className="sign-in-up-preview focus-outline"
        $mDisplay="none"
        width="45%"
        height="75%"
        margin="0 24px 0 0"
        as={"aside"}
        tabIndex={0}
        aria-label="A 3D looking image card of three friends hugging each other in a frame"
      ></Flex>
    </Flex>
  );
};

export default LoginContainer;
