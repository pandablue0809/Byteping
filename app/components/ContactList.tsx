import Flex from "@/styles/Flex.styled";
import React from "react";

const ContactList = () => {
  return (
    <Flex as={"aside"} width="30%" mWidth="100%" flexDirection="column" gap="24px" padding="24px">
      <li>A</li>
      <li>B</li>
      <li>C</li>
      <li>D</li>
      <li>E</li>
    </Flex>
  );
};

export default ContactList;
