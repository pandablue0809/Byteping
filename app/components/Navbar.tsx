import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import { BsSun } from "react-icons/bs";
import { BsMoonStars } from "react-icons/bs";
import { useContext } from "react";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "@/styles/Nav.styled";
import NotificationButton from "./NotificationButton";
import AccountButton from "./AccountButton";
import SearchButton from "./SearchButton";

const Navbar = () => {
  const { isDark, toggleDarkLightMode } = useContext(DarkLightModeContext)!;

  return (
    <AnimatePresence>
      <Nav
        as={motion.nav}
        $backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
        $borderRadius="4px 4px 0 0"
        $padding="24px"
        $justifyContent="space-between"
        $alignItems="center"
        $borderBottom={`1px solid ${isDark ? Theme.colors.lightWhite : Theme.colors.lightGrey}`}
      >
        <Flex gap="24px" alignItems="center" justifyContent="flex-start">
          <SearchButton />
          <Container
            width="40px"
            height="40px"
            padding="8px"
            backgroundColor={Theme.colors.violet}
            borderRadius="12px"
            hBackgroundColor={Theme.colors.lightViolet}
            cursor="pointer"
            onClick={toggleDarkLightMode}
          >
            {isDark ? (
              <BsSun size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
            ) : (
              <BsMoonStars size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
            )}
          </Container>
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
    </AnimatePresence>
  );
};

export default Navbar;
