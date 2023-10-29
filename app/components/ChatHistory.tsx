import { ChatState } from "@/contexts/ChatProvider";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import { UserData } from "@/types";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import ProfileModal from "./ProfileModal/ProfileModal";
import UpdateGroupModal from "./UpdateGroupModal";
import SingleChat from "./SingleChat";

const ChatHistory = ({
  fetchAgain,
  setFetchAgain
}: {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user, selectedChat, setSelectedChat } = ChatState()!;
  const { isDark } = useContext(DarkLightModeContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<UserData>();

  const defaultProfileUrl = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  const getSenderPic = (loggedUserData: UserData | undefined, users: UserData[]) => {
    if (!loggedUserData) {
      if (localStorage) {
        const userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
          loggedUserData = JSON.parse(userInfoString);
        }
      }
    }
    return users[0]._id === loggedUserData?._id ? users[1].pic : users[0].pic;
  };

  const getSender = (loggedUserData: UserData | undefined, users: UserData[]) => {
    if (!loggedUserData) {
      if (localStorage) {
        const userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
          loggedUserData = JSON.parse(userInfoString);
        }
      }
    }
    return users[0]._id === loggedUserData?._id ? users[1].name : users[0].name;
  };

  const getSenderFull = (loggedUserData: UserData | undefined, users: UserData[]) => {
    if (!loggedUserData) {
      if (localStorage) {
        const userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
          loggedUserData = JSON.parse(userInfoString);
        }
      }
    }
    return users[0]._id === loggedUserData?._id ? users[1] : users[0];
  };

  const profileClickHandler = () => {
    if (!selectedChat?.isGroupChat) {
      setIsModalOpen(true);
      return;
    }
    setIsUpdateModalOpen(true);
  };

  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem("userInfo");
    if (userInfoFromLocalStorage !== null) {
      const parsedUserInfo = JSON.parse(userInfoFromLocalStorage);
      setLoggedUser(parsedUserInfo);
    }
  }, []);

  return (
    <>
      {selectedChat ? (
        <>
          <Flex
            as={"header"}
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${isDark ? Theme.colors.white : Theme.colors.black}`}
            padding="0 0 16px 0"
          >
            <Flex gap="8px" alignItems="center" $cursor="pointer" onClick={profileClickHandler}>
              <Container
                width="48px"
                height="48px"
                padding="8px"
                backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
                borderRadius="50%"
                cursor="pointer"
              >
                {!selectedChat.isGroupChat ? (
                  getSenderPic(loggedUser, selectedChat.users) === defaultProfileUrl ? (
                    <VscAccount size={32} fill={isDark ? Theme.colors.white : Theme.colors.black} />
                  ) : (
                    <Image
                      src={getSenderPic(loggedUser, selectedChat.users)}
                      alt={user?.name || "user profile photo"}
                      width={32}
                      height={32}
                      style={{ borderRadius: "100%" }}
                    />
                  )
                ) : (
                  <VscAccount size={32} fill={isDark ? Theme.colors.white : Theme.colors.black} />
                )}
              </Container>
              <Flex flexDirection="column">
                <Text fontSize="18px" fontWeight="600" color={isDark ? Theme.colors.white : Theme.colors.black}>
                  {!selectedChat.isGroupChat
                    ? getSender(loggedUser, selectedChat.users).toUpperCase()
                    : selectedChat.chatName.toUpperCase()}
                </Text>
              </Flex>
            </Flex>
            <ProfileModal
              user={getSenderFull(loggedUser, selectedChat.users)}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
            <UpdateGroupModal
              isOpen={isUpdateModalOpen}
              onClose={() => setIsUpdateModalOpen(false)}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
            <Container
              width="40px"
              height="40px"
              padding="8px"
              backgroundColor={Theme.colors.violet}
              borderRadius="12px"
              hBackgroundColor={Theme.colors.lightViolet}
              cursor="pointer"
              onClick={() => setSelectedChat(undefined)}
            >
              <BiArrowBack size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
            </Container>
          </Flex>
          <SingleChat />
        </>
      ) : (
        <Text color={isDark ? Theme.colors.white : Theme.colors.black}>Select a chat to start a Byte Chat...</Text>
      )}
    </>
  );
};

export default ChatHistory;
