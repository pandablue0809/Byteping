import React, { useContext } from "react";
import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Theme from "@/styles/Theme.styled";
import Image from "next/image";
import { VscAccount } from "react-icons/vsc";
import Text from "@/styles/Text.styled";

type UserData = {
  email: string;
  name: string;
  pic: string;
  token?: string;
  _id: string;
};

type ProfileModalProps = {
  user?: UserData | null;
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ user, children, isOpen, onClose }) => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const defaultProfileUrl = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  return (
    <>
      {isOpen && (
        <Container
          $position="fixed"
          $top="0"
          $bottom="0"
          $left="0"
          $right="0"
          backgroundColor={`${!isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"}`}
          $zIndex="100"
        >
          <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
            <Container
              $position="relative"
              backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
              padding="24px"
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
              {children ? (
                children
              ) : (
                <Flex alignItems="center" gap="24px">
                  <Container
                    width="120px"
                    height="120px"
                    padding="8px"
                    backgroundColor={Theme.colors.violet}
                    borderRadius="12px"
                    hBackgroundColor={Theme.colors.lightViolet}
                    cursor="pointer"
                  >
                    {user?.pic === defaultProfileUrl ? (
                      <VscAccount size={104} fill={isDark ? Theme.colors.black : Theme.colors.white} />
                    ) : (
                      <Image
                        src={user?.pic || ""}
                        alt={user?.name || "user profile photo"}
                        width={104}
                        height={104}
                        style={{ borderRadius: "100%" }}
                      />
                    )}
                  </Container>
                  <Flex flexDirection="column" gap="8px">
                    <Text
                      fontSize="24px"
                      fontWeight="600"
                      lineHeight="125%"
                      color={isDark ? Theme.colors.white : Theme.colors.black}
                    >
                      {user?.name}
                    </Text>
                    <Text
                      fontSize="16px"
                      fontWeight="400"
                      color={isDark ? Theme.colors.darkGrey : Theme.colors.extraDarkGrey}
                    >
                      {user?.email}
                    </Text>
                  </Flex>
                </Flex>
              )}
            </Container>
          </Flex>
        </Container>
      )}
    </>
  );
};

export default ProfileModal;
