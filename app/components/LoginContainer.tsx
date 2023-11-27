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

  return (
    <Flex
      backgroundColor={Theme.colors.white}
      height="100vh"
      padding="48px"
      mPadding="24px"
      justifyContent="center"
      alignItems="center"
    >
      <Container width="50%" padding="48px" mPadding="0" mWidth="100%">
        <Text fontSize="30px" fontWeight="500" margin="0 0 12px 0">
          {signIn ? "Sign In" : "Sign Up"}
        </Text>
        <Text fontSize="16px" fontWeight="400" margin="0 0 4px 0">
          {signIn ? "If you don’t have an account" : "If you already have an account"}
        </Text>
        <Text fontSize="16px" fontWeight="400" margin="0 0 40px 0">
          You can{" "}
          {signIn ? (
            <span onClick={() => setSignIn(!signIn)} className="dark-blue-span">
              Register here !
            </span>
          ) : (
            <span onClick={() => setSignIn(!signIn)} className="dark-blue-span">
              Login here !
            </span>
          )}
        </Text>
        {signIn ? <SignIn /> : <SignUp />}
      </Container>
      <Flex className="sign-in-up-preview" $mDisplay="none" width="45%" height="75%" margin="0 24px 0 0"></Flex>
    </Flex>
  );
};

export default LoginContainer;
