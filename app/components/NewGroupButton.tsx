import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Container from "@/styles/Container.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext, useState } from "react";
import { PiUsersLight } from "react-icons/pi";
import NewGroupModal from "./NewGroupModal";

const NewGroupButton = () => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newGroupClickHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Container
        width="40px"
        height="40px"
        padding="8px"
        backgroundColor={Theme.colors.violet}
        borderRadius="12px"
        hBackgroundColor={Theme.colors.lightViolet}
        cursor="pointer"
        $position="relative"
        onClick={newGroupClickHandler}
      >
        <PiUsersLight size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
      </Container>
      <NewGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default NewGroupButton;
