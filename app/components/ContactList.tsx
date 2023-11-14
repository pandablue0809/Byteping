import { ChatState } from "@/contexts/ChatProvider";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import { SERVER_URL } from "@/utils/global";
import React, { useContext, useEffect, useState } from "react";
import Container from "@/styles/Container.styled";
import Loader from "./Loader";
import { VscAccount } from "react-icons/vsc";
import Image from "next/image";
import { UserData } from "@/types";
import NewGroupButton from "./NewGroupButton";

const ContactList = ({ fetchAgain }: { fetchAgain: boolean }) => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const [loggedUser, setLoggedUser] = useState<UserData>();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState()! || {
    user: undefined,
    setUser: () => {},
    selectedChat: undefined,
    setSelectedChat: () => {},
    chats: [],
    setChats: () => {}
  };

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

  const fetchAllChats = async () => {
    try {
      let token;
      let userInfoString;
      let userInfo;
      if (localStorage) {
        userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
          userInfo = JSON.parse(userInfoString);
        }
        token = user?.token ? user?.token : userInfo.token;
      }

      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await fetch(`${SERVER_URL}/api/chat`, config);
      if (!response.ok) {
        throw new Error("Failed to fetch chats");
      }
      const data = await response.json();
      setChats(data);
    } catch (error) {
      throw new Error("Failed to fetch chats");
    }
  };

  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem("userInfo");
    if (userInfoFromLocalStorage !== null) {
      const parsedUserInfo = JSON.parse(userInfoFromLocalStorage);
      setLoggedUser(parsedUserInfo);
    }

    fetchAllChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);

  return (
    <Flex
      as={"aside"}
      width="30%"
      mWidth="100%"
      flexDirection="column"
      gap="16px"
      padding="24px"
      color={isDark ? Theme.colors.white : Theme.colors.black}
      display="flex"
      $mDisplay={selectedChat ? "none" : "flex"}
    >
      <Flex width="100%" justifyContent="space-between" alignItems="center" margin="0 0 8px 0">
        <Text color={isDark ? Theme.colors.white : Theme.colors.black} fontSize="24px">
          My Chats
        </Text>
        <NewGroupButton />
      </Flex>
      {chats?.length > 0 ? (
        chats?.map((userChat) => (
          <Flex
            gap="16px"
            alignItems="center"
            onClick={() => setSelectedChat(userChat)}
            $cursor="pointer"
            key={userChat?._id}
          >
            <Container
              width="48px"
              height="48px"
              padding="8px"
              backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
              borderRadius="50%"
              cursor="pointer"
            >
              {!userChat.isGroupChat ? (
                getSenderPic(loggedUser, userChat.users) === defaultProfileUrl ? (
                  <VscAccount size={32} fill={isDark ? Theme.colors.white : Theme.colors.black} />
                ) : (
                  <Image
                    src={getSenderPic(loggedUser, userChat.users)}
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
                {!userChat.isGroupChat ? getSender(loggedUser, userChat.users) : userChat.chatName}
              </Text>
            </Flex>
          </Flex>
        ))
      ) : (
        <Loader height="100%" />
      )}
    </Flex>
  );
};

export default ContactList;
