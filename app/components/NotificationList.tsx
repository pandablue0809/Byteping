import React, { useContext } from "react";
import Text from "@/styles/Text.styled";
import Flex from "@/styles/Flex.styled";
import Theme from "@/styles/Theme.styled";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import { ChatState } from "@/contexts/ChatProvider";
import { UserData } from "@/types";

const NotificationList = ({ toggleNotificationHandler }: { toggleNotificationHandler: () => void }) => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const { user, notifications, setSelectedChat, setNotifications } = ChatState()!;

  const getSender = (loggedUserData: UserData | undefined, users: UserData[]) => {
    if (!loggedUserData) {
      if (localStorage) {
        const userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
          loggedUserData = JSON.parse(userInfoString);
        }
      }
    }
    return users[0]._id === loggedUserData?._id ? users[1].name : users[0].name;
  };

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
      {notifications.length ? (
        notifications.map((notification) => (
          <Text
            onClick={() => {
              setSelectedChat(notification.chat);
              setNotifications(notifications.filter((n) => n !== notification));
              toggleNotificationHandler();
            }}
            key={notification._id}
            color={isDark ? Theme.colors.black : Theme.colors.white}
            $cursor="pointer"
          >
            {notification.chat.isGroupChat
              ? `New message in ${notification.chat.chatName}`
              : `New message from ${getSender(user, notification.chat.users)}`}
          </Text>
        ))
      ) : (
        <Text color={isDark ? Theme.colors.black : Theme.colors.white} $cursor="pointer">
          No new messages
        </Text>
      )}
    </Flex>
  );
};

export default NotificationList;
