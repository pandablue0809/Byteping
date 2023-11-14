import Container from "@/styles/Container.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationList from "./NotificationList";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Flex from "@/styles/Flex.styled";

const NotificationButton = () => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const [toggleNotification, setToggleNotification] = useState(false);

  const toggleNotificationHandler = () => {
    setToggleNotification((prev) => !prev);
  };

  return (
    <Flex $position="relative">
      <Container
        width="40px"
        height="40px"
        padding="8px"
        backgroundColor={Theme.colors.violet}
        borderRadius="12px"
        hBackgroundColor={Theme.colors.lightViolet}
        cursor="pointer"
        onClick={toggleNotificationHandler}
        $position="relative"
      >
        <IoMdNotificationsOutline size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
      </Container>
      {toggleNotification && <NotificationList toggleNotificationHandler={toggleNotificationHandler} />}
    </Flex>
  );
};

export default NotificationButton;
