import { ChatState } from "@/contexts/ChatProvider";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Flex from "@/styles/Flex.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext } from "react";
import ChatHistory from "./ChatHistory";

const ChatWindow = ({
  fetchAgain,
  setFetchAgain
}: {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const { selectedChat } = ChatState()!;

  return (
    <Flex
      $flex="1"
      padding="24px"
      as={"section"}
      $borderLeft={`1px solid ${isDark ? Theme.colors.lightWhite : Theme.colors.lightGrey}`}
      display="flex"
      flexDirection="column"
      $mDisplay={selectedChat ? "flex" : "none"}
    >
      <ChatHistory fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Flex>
  );
};

export default ChatWindow;
