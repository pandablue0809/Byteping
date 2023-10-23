import Flex from "@/styles/Flex.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext, useState } from "react";
import ChatWindow from "./ChatWindow";
import ContactList from "./ContactList";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import { motion } from "framer-motion";

const ChatBox = () => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);

  return (
    <Flex
      as={motion.section}
      transition={{ duration: 2, type: "spring" }}
      backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
      width="100%"
      borderRadius="0 0 4px 4px"
      height="80vh"
    >
      <ContactList fetchAgain={fetchAgain} />
      <ChatWindow fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Flex>
  );
};

export default ChatBox;
