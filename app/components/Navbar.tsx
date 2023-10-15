import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import { AiOutlineSearch } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsSun } from "react-icons/bs";
import { BsMoonStars } from "react-icons/bs";
import { DarkModeState } from "@/context/DarkLightModeProvider";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { darkMode, setDarkMode } = DarkModeState()!;
  const router = useRouter();

  const darkModeHandler = () => {
    setDarkMode((prev) => !prev);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    router.refresh();
  };
  return (
    <Flex
      as={"nav"}
      backgroundColor={Theme.colors.white}
      borderRadius="4px 4px 0 0"
      padding="24px"
      border={`1px solid ${Theme.colors.lightGrey}`}
      justifyContent="space-between"
      alignItems="center"
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
          <AiOutlineSearch size={24} fill={Theme.colors.green} />
        </Container>
        <Container
          width="40px"
          height="40px"
          padding="8px"
          backgroundColor={Theme.colors.violet}
          borderRadius="12px"
          hBackgroundColor={Theme.colors.lightViolet}
          cursor="pointer"
          onClick={darkModeHandler}
        >
          {darkMode ? (
            <BsSun size={24} fill={Theme.colors.green} />
          ) : (
            <BsMoonStars size={24} fill={Theme.colors.green} />
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
          <IoMdNotificationsOutline size={24} fill={Theme.colors.green} />
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
          <VscAccount size={24} fill={Theme.colors.green} />
        </Container>
      </Flex>
    </Flex>
  );
};

export default Navbar;
