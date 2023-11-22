import Flex from "@/styles/Flex.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext, useState } from "react";
import ChatWindow from "./ChatWindow";
import ContactList from "./ContactList";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";

const ChatBox = () => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  return (
    <Flex
      as={"section"}
      backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
      width="100%"
      borderRadius="0 0 4px 4px"
      height="calc(100vh - 80px - 48px - 48px)"
      mHeight="calc(100vh - 80px - 24px - 24px)"
    >
      <ContactList fetchAgain={fetchAgain} />
      <ChatWindow fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Flex>
  );
};

export default ChatBox;
