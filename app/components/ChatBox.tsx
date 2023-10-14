import Flex from "@/styles/Flex.styled";
import React from "react";
import ChatWindow from "./ChatWindow";
import ContactList from "./ContactList";

const ChatBox = () => {
  return (
    <Flex as={"section"}>
      <ContactList />
      <ChatWindow />
    </Flex>
  );
};

export default ChatBox;
