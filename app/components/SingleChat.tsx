import Flex from "@/styles/Flex.styled";
import React, { useState, useContext, useEffect } from "react";
import Loader from "./Loader";
import Input from "@/styles/Input.styled";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Theme from "@/styles/Theme.styled";
import { SERVER_URL } from "@/utils/global";
import { ChatState } from "@/contexts/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import { ChatData, MessageData } from "@/types";
import io, { Socket } from "socket.io-client";

const ENDPOINT = SERVER_URL;
let socket: Socket;
let selectedChatCompare: ChatData | undefined | null;

const SingleChat = ({
  fetchAgain,
  setFetchAgain
}: {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const { user, selectedChat, notifications, setNotifications } = ChatState()!;
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

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
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      throw new Error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat?._id);
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
        socket.emit("new message", data);
        setMessages((prev) => [...prev, data]);
      } catch (error) {
        throw new Error("Failed to send Message");
      }
    }
  };

  const typingHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);

    // Typing Indicator
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      if (timeNow - lastTypingTime >= timerLength && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        if (!notifications.includes(newMessageReceived)) {
          setNotifications([newMessageReceived, ...notifications]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages((prev) => [...prev, newMessageReceived]);
      }
    });

    return () => {
      socket.off("message received");
    };
  });

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
            <ScrollableChat messages={messages} isTyping={isTyping} />
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
