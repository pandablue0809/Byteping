import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import Image from "next/image";
import React, { useContext } from "react";
import { VscAccount } from "react-icons/vsc";

type UserData = {
  email: string;
  name: string;
  pic: string;
  token: string;
  _id: string;
};

const SearchListItem = ({ user, handleFuncion }: { user: UserData; handleFuncion?: () => void }) => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const defaultProfileUrl = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  return (
    <Flex gap="16px" alignItems="center" onClick={handleFuncion} $cursor="pointer">
      <Container
        width="48px"
        height="48px"
        padding="8px"
        backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
        borderRadius="50%"
        cursor="pointer"
      >
        {user?.pic === defaultProfileUrl ? (
          <VscAccount size={32} fill={isDark ? Theme.colors.white : Theme.colors.black} />
        ) : (
          <Image
            src={user?.pic}
            alt={user?.name || "user profile photo"}
            width={32}
            height={32}
            style={{ borderRadius: "100%" }}
          />
        )}
      </Container>
      <Flex flexDirection="column">
        <Text fontSize="18px" fontWeight="600" color={isDark ? Theme.colors.black : Theme.colors.white}>
          {user?.name}
        </Text>
        <Text fontSize="12px" fontWeight="400" color={isDark ? Theme.colors.black : Theme.colors.white}>
          {user?.email}
        </Text>
      </Flex>
    </Flex>
  );
};

export default SearchListItem;
