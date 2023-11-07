import Flex from "@/styles/Flex.styled";
import React, { useState, useContext, useEffect } from "react";
import Loader from "./Loader";
import Input from "@/styles/Input.styled";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Theme from "@/styles/Theme.styled";
import { SERVER_URL } from "@/utils/global";
import { ChatState } from "@/contexts/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import { MessageData } from "@/types";
import io, { Socket } from "socket.io-client";

const ENDPOINT = SERVER_URL;
let socket: Socket;

const SingleChat = () => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const { user, selectedChat } = ChatState()!;
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [socketConnected, setSocketConnected] = useState(false);

  const sendMessage = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const reqData = {
          content: newMessage,
          chatId: selectedChat
        };
        setNewMessage("");
        const config = {
          method: "POST",
          body: JSON.stringify(reqData),
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-type": "application/json"
          }
        };

        const response = await fetch(`${SERVER_URL}/api/message`, config);
        const data = await response.json();
        setMessages([...messages, data]);
      } catch (error) {
        throw new Error("Failed to send Message");
      }
    }
  };

  const typingHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      };
      const response = await fetch(`${SERVER_URL}/api/message/${selectedChat?._id}`, config);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      throw new Error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, [user]);

  return (
    <>
      {loading ? (
        <Loader height="100%" />
      ) : (
        <>
          <Flex
            as={"main"}
            height="-webkit-fill-available"
            flexDirection="column"
            width="100%"
            justifyContent="space-between"
            $overflowY="auto"
          >
            <ScrollableChat messages={messages} />
            <Input
              type="text"
              required
              placeholder="Type your message here"
              textColor={isDark ? Theme.colors.white : Theme.colors.black}
              $pTextColor={isDark ? Theme.colors.white : Theme.colors.black}
              $pFontSize="16px"
              $fontSize="16px"
              $pFontWeight="400"
              $pLineHeight="150%"
              padding="16px 12px"
              borderRadius="4px"
              backgroundColor="transparent"
              $border={`1px solid ${isDark ? Theme.colors.white : Theme.colors.black}`}
              $outline="0"
              value={newMessage}
              onChange={typingHandler}
              onKeyDown={sendMessage}
            />
          </Flex>
        </>
      )}
    </>
  );
};

export default SingleChat;
