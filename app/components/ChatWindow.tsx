import { ChatState } from "@/contexts/ChatProvider";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext } from "react";

const ChatWindow = () => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const { selectedChat } = ChatState()!;

  return (
    <Flex
      $flex="1"
      padding="24px"
      as={"section"}
      $borderLeft={`1px solid ${isDark ? Theme.colors.lightWhite : Theme.colors.lightGrey}`}
      display="flex"
      $mDisplay={selectedChat ? "flex" : "none"}
    >
      <Text color={isDark ? Theme.colors.white : Theme.colors.black}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem magni pariatur, dignissimos quia
        accusamus dolorem ad saepe, tempora magnam cum eum corrupti perspiciatis aliquid aperiam? Cupiditate vero amet
        quam perferendis?
      </Text>
    </Flex>
  );
};

export default ChatWindow;
