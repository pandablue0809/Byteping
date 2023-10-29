import { ChatState } from "@/contexts/ChatProvider";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Input from "@/styles/Input.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import { UserData } from "@/types";
import { SERVER_URL } from "@/utils/global";
import React, { useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdExitToApp } from "react-icons/md";
import Loader from "./Loader";
import SearchListItem from "./SearchListItem";

type UpdateGroupModalProps = {
  user?: UserData | null;
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const UpdateGroupModal: React.FC<UpdateGroupModalProps> = ({
  fetchAgain,
  setFetchAgain,
  children,
  isOpen,
  onClose
}) => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const { user, selectedChat, setSelectedChat } = ChatState()!;
  const [groupChatName, setGroupChatName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRenameLoading, setIsRenameLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleRemove = async (userTryingToRemove: UserData | undefined) => {
    if (selectedChat?.groupAdmin?._id !== user?._id && userTryingToRemove?._id !== user?._id) {
      throw new Error("Only admin can remove the user");
    }

    try {
      setIsLoading(true);
      const requestBody = {
        chatId: selectedChat?._id,
        userId: userTryingToRemove?._id
      };

      const config = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      };

      const response = await fetch(`${SERVER_URL}/api/chat/groupremove`, config);
      const data = await response.json();
      userTryingToRemove?._id === user?._id ? setSelectedChat(undefined) : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      throw new Error("Failed to remove user to the group");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }
    try {
      setIsRenameLoading(true);
      const requestBody = {
        chatId: selectedChat?._id,
        chatName: groupChatName
      };

      const config = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      };

      const response = await fetch(`${SERVER_URL}/api/chat/rename`, config);
      const data = await response.json();
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      throw new Error("Failed to rename group");
    } finally {
      setIsRenameLoading(false);
      setGroupChatName("");
    }
  };

  const handleSearch = async (query: string) => {
    setSearchText(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      setIsLoading(true);
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
      throw new Error("Failed to fetch users to create group");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (userTryingToAdd: UserData) => {
    if (selectedChat?.users.find((u) => u._id === userTryingToAdd._id)) {
      throw new Error("User already in the group");
    }
    if (selectedChat?.groupAdmin?._id !== user?._id) {
      throw new Error("Only admin can add the user");
    }
    try {
      setIsLoading(true);
      const requestBody = {
        chatId: selectedChat?._id,
        userId: userTryingToAdd._id
      };

      const config = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      };
      const response = await fetch(`${SERVER_URL}/api/chat/groupadd`, config);
      const data = await response.json();
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      throw new Error("Failed to add user to the group");
    } finally {
      setIsLoading(false);
    }
  };

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
              width="50%"
              mWidth="100%"
              mHeight="100%"
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
                $right="64px"
                $top="12px"
                onClick={() => handleRemove(user)}
              >
                <MdExitToApp size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
              </Container>

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
                <Flex gap="20px" flexDirection="column">
                  <Text
                    fontSize="24px"
                    fontWeight="600"
                    lineHeight="125%"
                    color={isDark ? Theme.colors.white : Theme.colors.black}
                  >
                    {selectedChat?.chatName}
                  </Text>
                  <Flex
                    padding="8px"
                    gap="8px"
                    flexDirection="row"
                    $flexWrap="wrap"
                    border={`1px solid ${isDark ? Theme.colors.white : Theme.colors.black}`}
                    borderRadius="4px"
                  >
                    {selectedChat?.users.length === 0 ? (
                      <Text color={isDark ? Theme.colors.white : Theme.colors.black}>No users in group</Text>
                    ) : (
                      selectedChat?.users.map((u: UserData) => {
                        return (
                          <Container
                            key={u?._id}
                            padding="8px 12px"
                            width="calc(50% - 4px)"
                            backgroundColor={Theme.colors.lightViolet}
                            textAlign="center"
                            borderRadius="4px"
                            cursor="pointer"
                            $position="relative"
                          >
                            <Text color={isDark ? Theme.colors.black : Theme.colors.white}>{u?.name}</Text>
                            <Container
                              $position="absolute"
                              $top="calc(50% - 8px)"
                              $right="8px"
                              onClick={() => handleRemove(u)}
                            >
                              <AiOutlineCloseCircle size={16} fill={isDark ? Theme.colors.black : Theme.colors.white} />
                            </Container>
                          </Container>
                        );
                      })
                    )}
                  </Flex>
                  <Flex gap="16px" alignItems="stretch">
                    <Input
                      type="text"
                      height="48px"
                      borderRadius="4px"
                      backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
                      padding="12px 24px 12px 24px"
                      placeholder="Rename Group"
                      textColor={isDark ? Theme.colors.white : Theme.colors.black}
                      $pTextColor={isDark ? Theme.colors.white : Theme.colors.black}
                      $pFontSize="16px"
                      $pFontWeight="400"
                      $pLineHeight="150%"
                      $outline="0"
                      $border={`1px solid ${isDark ? Theme.colors.white : Theme.colors.black}`}
                      onChange={(e) => setGroupChatName(e.target.value)}
                      $flex="1"
                      value={groupChatName}
                    />
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      height="inherit"
                      width="30%"
                      backgroundColor={Theme.colors.violet}
                      $hBackgroundColor={Theme.colors.lightViolet}
                      padding="8px 12px"
                      borderRadius="4px"
                      $cursor="pointer"
                      onClick={handleRename}
                    >
                      <Text color={isDark ? Theme.colors.black : Theme.colors.white}>
                        {isRenameLoading ? "Renaming..." : "Rename"}
                      </Text>
                    </Flex>
                  </Flex>
                  <Input
                    type="text"
                    height="48px"
                    borderRadius="4px"
                    backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
                    padding="12px 24px 12px 24px"
                    placeholder="Add Users"
                    textColor={isDark ? Theme.colors.white : Theme.colors.black}
                    $pTextColor={isDark ? Theme.colors.white : Theme.colors.black}
                    $pFontSize="16px"
                    $pFontWeight="400"
                    $pLineHeight="150%"
                    $outline="0"
                    $border={`1px solid ${isDark ? Theme.colors.white : Theme.colors.black}`}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <Flex gap="8px" flexDirection="row" $flexWrap="wrap">
                    {isLoading ? (
                      <Loader size="50px" />
                    ) : (
                      searchResults.slice(0, 2).map((u: UserData) => {
                        return (
                          <Container
                            key={u?._id}
                            padding="8px 12px"
                            width="calc(50% - 4px)"
                            backgroundColor={Theme.colors.lightViolet}
                            borderRadius="4px"
                            cursor="pointer"
                            onClick={() => handleAddUser(u)}
                          >
                            <SearchListItem user={u} />
                          </Container>
                        );
                      })
                    )}
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

export default UpdateGroupModal;
