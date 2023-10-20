import { ChatState } from "@/contexts/ChatProvider";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Input from "@/styles/Input.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import React, { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Loader from "./Loader";
import SearchListItem from "./SearchListItem";
import { SERVER_URL } from "@/utils/global";

type UserData = {
  email: string;
  name: string;
  pic: string;
  token: string;
  _id: string;
};

const SearchList = ({ onClose }: { onClose: () => void }) => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const { user, setSelectedChat, chats, setChats } = ChatState() || {
    user: undefined,
    setSelectedChat: () => {},
    chats: [],
    setChats: () => {}
  };
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [loadingChat, setLoadingChat] = useState(false);

  const searchHandler = async () => {
    if (!searchText) {
      alert("Type Something");
      return;
    }

    try {
      setLoadingChat(true);
      const config = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      };
      const response = await fetch(`${SERVER_URL}/api/user?search=${searchText}`, config);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      throw new Error("Failed to load search results");
    } finally {
      setLoadingChat(false);
    }
  };

  const accessChat = async (userId: string) => {
    try {
      setLoadingChat(true);
      const config = {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user?.token}`
        }
      };
      const response = await fetch(`${SERVER_URL}/api/chat`, config);
      const data = await response.json();
      if (!chats.find((u) => u._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
    } catch (error) {
      throw new Error("Failed to fetch user chat");
    } finally {
      setLoadingChat(false);
      onClose();
    }
  };

  return (
    <Flex
      backgroundColor={Theme.colors.violet}
      borderRadius="4px"
      $position="absolute"
      $top="100%"
      $left="0"
      margin="8px 0 0 0"
      padding="16px"
      flexDirection="column"
      gap="8px"
      $textWrap="nowrap"
      $cursor="default"
      onClick={(e) => e.stopPropagation()}
    >
      <Text color={isDark ? Theme.colors.black : Theme.colors.white} fontSize="20px" fontWeight="600" lineHeight="150%">
        Search Users
      </Text>
      <Container $position="relative">
        <Input
          type="text"
          height="48px"
          borderRadius="12px"
          backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
          padding="12px 24px 12px 60px"
          placeholder="Search users"
          textColor={isDark ? Theme.colors.white : Theme.colors.black}
          $pTextColor={isDark ? Theme.colors.white : Theme.colors.black}
          $pFontSize="16px"
          $pFontWeight="400"
          $pLineHeight="150%"
          $border="0"
          $outline="0"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Container
          $position="absolute"
          $top="12px"
          $left="24px"
          cursor="pointer"
          onClick={searchHandler}
          width="24px"
          height="24px"
        >
          <AiOutlineSearch size={24} fill={isDark ? Theme.colors.white : Theme.colors.black} />
        </Container>
      </Container>
      {loadingChat ? (
        <Loader height="inherit" backgroundColor="transparent" />
      ) : (
        <Flex gap="16px" flexDirection="column" margin="8px 0 0 0">
          {searchResults.length === 0 ? (
            <Text
              fontWeight="600"
              fontSize="18px"
              lineHeight="150%"
              color={isDark ? Theme.colors.black : Theme.colors.white}
            >
              {"No results found :)"}
            </Text>
          ) : (
            searchResults?.map((searchUser) => (
              <SearchListItem user={searchUser} key={searchUser._id} handleFuncion={() => accessChat(searchUser._id)} />
            ))
          )}
          {loadingChat && <Loader />}
        </Flex>
      )}
    </Flex>
  );
};

export default SearchList;
