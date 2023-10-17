import React, { useContext } from "react";
import Text from "@/styles/Text.styled";
import Flex from "@/styles/Flex.styled";
import Theme from "@/styles/Theme.styled";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";

const NotificationList = () => {
  const { isDark } = useContext(DarkLightModeContext)!;

  return (
    <Flex
      backgroundColor={Theme.colors.violet}
      borderRadius="4px"
      $position="absolute"
      $top="100%"
      $right="0"
      margin="8px 0 0 0"
      padding="16px"
      flexDirection="column"
      gap="8px"
      $textWrap="nowrap"
    >
      <Text color={isDark ? Theme.colors.black : Theme.colors.white} $cursor="pointer">
        Notification 1
      </Text>
      <Text color={isDark ? Theme.colors.black : Theme.colors.white} $cursor="pointer">
        Notification 2
      </Text>
    </Flex>
  );
};

export default NotificationList;
