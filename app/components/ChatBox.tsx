import Flex from "@/styles/Flex.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext } from "react";
import ChatWindow from "./ChatWindow";
import ContactList from "./ContactList";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import { motion } from "framer-motion";

const ChatBox = () => {
  const { isDark } = useContext(DarkLightModeContext)!;

  return (
    <Flex
      as={motion.section}
      transition={{ duration: 2, type: "spring" }}
      backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
      width="100%"
      borderRadius="0 0 4px 4px"
    >
      <ContactList />
      <ChatWindow />
    </Flex>
  );
};

export default ChatBox;
