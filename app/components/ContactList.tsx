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
import { ChatData, UserData } from "@/types";
import NewGroupButton from "./NewGroupButton";
import { getDate, getTime } from "@/utils/date";

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

  const getMessagedPersonName = (userChat: ChatData) => {
    return userChat.latestMessage?.sender.email === user?.email ? "You" : userChat.latestMessage?.sender.name;
  };

  const getSenderPic = (loggedUserData: UserData | undefined, users: UserData[]) => {
    if (!loggedUserData) {
      if (localStorage) {
        const userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
          loggedUserData = JSON.parse(userInfoString);
        }
      }
    }
    return users[0]._id === loggedUserData?._id ? users[1]?.pic : users[0]?.pic;
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
    return users[0]._id === loggedUserData?._id ? users[1]?.name : users[0]?.name;
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
      $overflowY="scroll"
      className="hideVerticalScrollBar"
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
              width="40px"
              height="40px"
              padding="8px"
              backgroundColor={Theme.colors.violet}
              borderRadius="12px"
              hBackgroundColor={Theme.colors.lightViolet}
              cursor="pointer"
            >
              {!userChat.isGroupChat ? (
                getSenderPic(loggedUser, userChat.users) === defaultProfileUrl ? (
                  <VscAccount size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
                ) : (
                  <Image
                    src={getSenderPic(loggedUser, userChat.users)}
                    alt={user?.name || "user profile photo"}
                    width={24}
                    height={24}
                    style={{ borderRadius: "100%" }}
                  />
                )
              ) : (
                <VscAccount size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
              )}
            </Container>
            <Flex flexDirection="column" gap="4px" $flex="1">
              <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
                <Text fontSize="18px" fontWeight="600" color={isDark ? Theme.colors.white : Theme.colors.black}>
                  {!userChat.isGroupChat ? getSender(loggedUser, userChat.users) : userChat.chatName}
                </Text>
                {userChat.latestMessage?.createdAt && (
                  <Text
                    fontSize="14px"
                    fontWeight="400"
                    color={isDark ? Theme.colors.lightGrey : Theme.colors.extraDarkGrey}
                  >
                    {getDate(userChat.latestMessage?.createdAt) === "Today"
                      ? getTime(userChat.latestMessage.createdAt, false)
                      : getDate(userChat.latestMessage?.createdAt)}
                  </Text>
                )}
              </Flex>
              {userChat.latestMessage?.content && (
                <Text
                  style={{
                    width: "75%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical"
                  }}
                  fontSize="16px"
                  color={isDark ? Theme.colors.lightGrey : Theme.colors.extraDarkGrey}
                >
                  {userChat.isGroupChat
                    ? `${getMessagedPersonName(userChat)}: ${userChat.latestMessage?.content}`
                    : userChat.latestMessage.content}
                </Text>
              )}
            </Flex>
          </Flex>
        ))
      ) : chats?.length === 0 ? (
        <Text color={isDark ? Theme.colors.white : Theme.colors.black}>Select your buddy to ping a byte...</Text>
      ) : (
        <Loader height="100%" />
      )}
    </Flex>
  );
};

export default ContactList;
