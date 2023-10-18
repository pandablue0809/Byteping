import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchList from "./SearchList";

const SearchButton = () => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const [toggleSearch, setToggleSearch] = useState(false);

  const toggleSearchHandler = () => {
    setToggleSearch((prev) => !prev);
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
        onClick={toggleSearchHandler}
      >
        <AiOutlineSearch size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
      </Container>
      {toggleSearch && <SearchList />}
    </Flex>
  );
};

export default SearchButton;
