import React, { useContext, useState } from "react";
import Container from "@/styles/Container.styled";
import Theme from "@/styles/Theme.styled";
import { VscAccount } from "react-icons/vsc";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import AccountList from "./AccountList";
import Flex from "@/styles/Flex.styled";

const AccountButton = () => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const [toggleAccount, setToggleAccount] = useState(false);

  const toggleAccountHandler = () => {
    setToggleAccount((prev) => !prev);
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
        $position="relative"
        onClick={toggleAccountHandler}
      >
        <VscAccount size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
      </Container>
      {toggleAccount && <AccountList />}
    </Flex>
  );
};

export default AccountButton;
