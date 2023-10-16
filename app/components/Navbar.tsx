import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import { AiOutlineSearch } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsSun } from "react-icons/bs";
import { BsMoonStars } from "react-icons/bs";
import { useContext } from "react";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "@/styles/Nav.styled";

const Navbar = () => {
  const { isDark, toggleDarkLightMode } = useContext(DarkLightModeContext)!;

  return (
    <AnimatePresence>
      <Nav
        as={motion.nav}
        animate={{ x: 100 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        $backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
        $borderRadius="4px 4px 0 0"
        $padding="24px"
        $justifyContent="space-between"
        $alignItems="center"
        $borderBottom={`1px solid ${isDark ? Theme.colors.lightWhite : Theme.colors.lightGrey}`}
        $transition="background-color 1s ease"
      >
        <Flex gap="24px" alignItems="center" justifyContent="flex-start">
          <Container
            width="40px"
            height="40px"
            padding="8px"
            backgroundColor={Theme.colors.violet}
            borderRadius="12px"
            hBackgroundColor={Theme.colors.lightViolet}
            cursor="pointer"
          >
            <AiOutlineSearch size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
          </Container>
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
          <Container
            width="40px"
            height="40px"
            padding="8px"
            backgroundColor={Theme.colors.violet}
            borderRadius="12px"
            hBackgroundColor={Theme.colors.lightViolet}
            cursor="pointer"
          >
            <IoMdNotificationsOutline size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
          </Container>
          <Container
            width="40px"
            height="40px"
            padding="8px"
            backgroundColor={Theme.colors.violet}
            borderRadius="12px"
            hBackgroundColor={Theme.colors.lightViolet}
            cursor="pointer"
          >
            <VscAccount size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
          </Container>
        </Flex>
      </Nav>
    </AnimatePresence>
  );
};

export default Navbar;
