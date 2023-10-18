import React, { useContext, useState } from "react";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Theme from "@/styles/Theme.styled";
import ProfileModal from "./ProfileModal/ProfileModal";
import { useRouter } from "next/navigation";
import { ChatState } from "@/contexts/ChatProvider";

const AccountList = () => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { user } = ChatState() || { user: null };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    router.push("/");
  };

  const profileClickHandler = () => {
    setIsModalOpen(true);
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
      $cursor="default"
      onClick={(e) => e.stopPropagation()}
    >
      <Text color={isDark ? Theme.colors.black : Theme.colors.white} onClick={profileClickHandler} $cursor="pointer">
        My Profile
      </Text>
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} />
      <Text color={isDark ? Theme.colors.black : Theme.colors.white} onClick={logoutHandler} $cursor="pointer">
        Logout
      </Text>
    </Flex>
  );
};

export default AccountList;
