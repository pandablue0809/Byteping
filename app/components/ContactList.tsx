import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext } from "react";

const ContactList = () => {
  const { isDark } = useContext(DarkLightModeContext)!;

  return (
    <Flex
      as={"aside"}
      width="30%"
      mWidth="100%"
      flexDirection="column"
      gap="24px"
      padding="24px"
      color={isDark ? Theme.colors.white : Theme.colors.black}
    >
      <Text color={isDark ? Theme.colors.white : Theme.colors.black}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem magni pariatur, dignissimos quia
        accusamus dolorem ad saepe, tempora magnam cum eum corrupti perspiciatis aliquid aperiam? Cupiditate vero amet
        quam perferendis?
      </Text>
    </Flex>
  );
};

export default ContactList;
