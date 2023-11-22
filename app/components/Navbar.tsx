import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import { useContext } from "react";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Nav from "@/styles/Nav.styled";
import NotificationButton from "./NotificationButton";
import AccountButton from "./AccountButton";
import SearchButton from "./SearchButton";
import DarkLightModeButton from "./DarkLightModeButton";

const Navbar = () => {
  const { isDark } = useContext(DarkLightModeContext)!;

  return (
    <Nav
      as={"nav"}
      $backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
      $borderRadius="4px 4px 0 0"
      $padding="24px"
      $justifyContent="space-between"
      $alignItems="center"
      $borderBottom={`1px solid ${isDark ? Theme.colors.lightWhite : Theme.colors.lightGrey}`}
      $height="80px"
    >
      <Flex gap="24px" alignItems="center" justifyContent="flex-start">
        <SearchButton />
        <DarkLightModeButton />
      </Flex>
      <Text
        as={"h1"}
        fontSize="1.5rem"
        fontStyle="normal"
        fontWeight="800"
        lineHeight="150%"
        letterSpacing="4px"
        mDisplay="none"
        color={isDark ? Theme.colors.white : Theme.colors.black}
      >
        BYTEPING
      </Text>
      <Flex gap="24px" alignItems="center" justifyContent="flex-end">
        <NotificationButton />
        <AccountButton />
      </Flex>
    </Nav>
  );
};

export default Navbar;
