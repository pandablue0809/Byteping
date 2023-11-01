import React, { useContext, useState } from "react";
import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Theme from "@/styles/Theme.styled";
import Text from "@/styles/Text.styled";
import { ChatState } from "@/contexts/ChatProvider";
import Input from "@/styles/Input.styled";
import { SERVER_URL } from "@/utils/global";
import Loader from "./Loader";
import SearchListItem from "./SearchListItem";

type UserData = {
  email: string;
  name: string;
  pic: string;
  token: string;
  _id: string;
};

type NewGroupModalProps = {
  user?: UserData | null;
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const NewGroupModal: React.FC<NewGroupModalProps> = ({ children, isOpen, onClose }) => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<UserData[] | []>([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { setChats, user, setSelectedChat } = ChatState()!;

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

  const handleSubmit = async () => {
    if (!groupChatName || !Array.isArray(selectedUsers) || selectedUsers.length < 2) {
      return;
    }
    try {
      const requestBody = {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id))
      };

      const config = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      };
      const response = await fetch(`${SERVER_URL}/api/chat/group`, config);
      const data = await response.json();
      setChats((prev) => [data, ...prev]);
      onClose();
      setSelectedChat(data);
    } catch (error) {
      throw new Error("Failed to create group");
    } finally {
      setSearchResults([]);
      setSelectedUsers([]);
      setSearchText("");
    }
  };

  const handleGroup = (userToAdd: UserData) => {
    if (selectedUsers.some((addedUser) => addedUser._id === userToAdd._id)) {
      setSearchText("");
      setSearchResults([]);
      return;
    }
    try {
      setSelectedUsers((prev) => [...prev, userToAdd]);
    } finally {
      setSearchText("");
      setSearchResults([]);
    }
  };

  const handleDelete = (userToDelete: UserData) => {
    setSelectedUsers((prev) => prev.filter((u) => u._id !== userToDelete._id));
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
                    New Group
                  </Text>
                  <Flex gap="12px" flexDirection="column">
                    <Input
                      type="text"
                      height="48px"
                      borderRadius="4px"
                      backgroundColor={isDark ? Theme.colors.black : Theme.colors.white}
                      padding="12px 24px 12px 24px"
                      placeholder="Group Name"
                      textColor={isDark ? Theme.colors.white : Theme.colors.black}
                      $pTextColor={isDark ? Theme.colors.white : Theme.colors.black}
                      $pFontSize="16px"
                      $pFontWeight="400"
                      $pLineHeight="150%"
                      $outline="0"
                      $border={`1px solid ${isDark ? Theme.colors.white : Theme.colors.black}`}
                      onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    <Input
                      type="text"
                      value={searchText}
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
                    <Flex
                      padding="8px"
                      gap="8px"
                      flexDirection="row"
                      $flexWrap="wrap"
                      border={`1px solid ${isDark ? Theme.colors.white : Theme.colors.black}`}
                      borderRadius="4px"
                    >
                      {selectedUsers.length === 0 ? (
                        <Text color={isDark ? Theme.colors.white : Theme.colors.black}>No user selected</Text>
                      ) : (
                        selectedUsers.map((u: UserData) => {
                          return (
                            <Container
                              key={u?._id}
                              padding="8px 12px"
                              width="calc(50% - 4px)"
                              backgroundColor={Theme.colors.lightViolet}
                              textAlign="center"
                              borderRadius="4px"
                              cursor="pointer"
                              onClick={() => handleGroup(u)}
                              $position="relative"
                            >
                              <Text color={isDark ? Theme.colors.black : Theme.colors.white}>{u?.name}</Text>
                              <Container
                                $position="absolute"
                                $top="calc(50% - 8px)"
                                $right="8px"
                                onClick={() => handleDelete(u)}
                              >
                                <AiOutlineCloseCircle
                                  size={16}
                                  fill={isDark ? Theme.colors.black : Theme.colors.white}
                                />
                              </Container>
                            </Container>
                          );
                        })
                      )}
                    </Flex>
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
                              onClick={() => handleGroup(u)}
                            >
                              <SearchListItem user={u} />
                            </Container>
                          );
                        })
                      )}
                    </Flex>
                  </Flex>
                  <Container
                    width="100%"
                    backgroundColor={Theme.colors.violet}
                    hBackgroundColor={Theme.colors.lightViolet}
                    textAlign="center"
                    padding="8px 12px"
                    borderRadius="4px"
                    cursor="pointer"
                    onClick={handleSubmit}
                  >
                    <Text color={isDark ? Theme.colors.black : Theme.colors.white}>Submit</Text>
                  </Container>
                </Flex>
              )}
            </Container>
          </Flex>
        </Container>
      )}
    </>
  );
};

export default NewGroupModal;
