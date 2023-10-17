import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Container from "@/styles/Container.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext } from "react";

const ChatWindow = () => {
  const { isDark } = useContext(DarkLightModeContext)!;

  return (
    <Container
      width="70%"
      padding="24px"
      as={"section"}
      borderLeft={`1px solid ${isDark ? Theme.colors.lightWhite : Theme.colors.lightGrey}`}
      color={isDark ? Theme.colors.black : Theme.colors.white}
    >
      <Text color={isDark ? Theme.colors.white : Theme.colors.black}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem magni pariatur, dignissimos quia
        accusamus dolorem ad saepe, tempora magnam cum eum corrupti perspiciatis aliquid aperiam? Cupiditate vero amet
        quam perferendis?
      </Text>
    </Container>
  );
};

export default ChatWindow;
