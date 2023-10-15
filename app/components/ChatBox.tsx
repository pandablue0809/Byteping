import Flex from "@/styles/Flex.styled";
import Theme from "@/styles/Theme.styled";
import React from "react";
import ChatWindow from "./ChatWindow";
import ContactList from "./ContactList";

const ChatBox = () => {
  return (
    <Flex as={"section"} backgroundColor={Theme.colors.white} width="100%">
      <ContactList />
      <ChatWindow />
    </Flex>
  );
};

export default ChatBox;
