import React, { useContext } from "react";
import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Theme from "@/styles/Theme.styled";

type ProfileModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ children, isOpen, onClose }) => {
  const { isDark } = useContext(DarkLightModeContext)!;

  return (
    <>
      {isOpen && (
        <Container
          $position="fixed"
          $top="0"
          $bottom="0"
          $left="0"
          $right="0"
          backgroundColor={`${isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`}
        >
          <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
            <Container
              $position="relative"
              backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
              padding="56px"
              borderRadius="4px"
            >
              <Container
                width="40px"
                height="40px"
                padding="8px"
                backgroundColor={Theme.colors.violet}
                borderRadius="12px"
                hBackgroundColor={Theme.colors.lightViolet}
                cursor="pointer"
                $position="absolute"
                $right="12px"
                $top="12px"
                onClick={onClose}
              >
                <AiOutlineCloseCircle size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
              </Container>
              {children}
            </Container>
          </Flex>
        </Container>
      )}
    </>
  );
};

export default ProfileModal;
