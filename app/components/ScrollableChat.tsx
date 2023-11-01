import { ChatState } from "@/contexts/ChatProvider";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import { MessageData } from "@/types";
import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import { VscAccount } from "react-icons/vsc";

const ScrollableChat = ({ messages }: { messages: MessageData[] }) => {
  const { isDark } = useContext(DarkLightModeContext)!;
  const { user } = ChatState()!;
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const defaultProfileUrl = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  const isSameSender = (msgs: MessageData[], m: MessageData, i: number, userId: string | undefined) => {
    return (
      i < msgs.length - 1 &&
      (msgs[i + 1]?.sender?._id !== m?.sender?._id || msgs[i + 1]?.sender?._id === undefined) &&
      msgs[i]?.sender?._id !== userId
    );
  };

  const isLastMessage = (msgs: MessageData[], i: number, userId: string | undefined) => {
    return i === msgs.length - 1 && msgs[msgs.length - 1].sender._id !== userId && msgs[msgs.length - 1].sender._id;
  };

  useEffect(() => {
    messageContainerRef.current?.scrollTo(0, messageContainerRef.current?.scrollHeight);
  }, [messages]);

  return (
    <Flex
      as={"div"}
      $overflowY="auto"
      flexDirection="column"
      gap="12px"
      height="-webkit-fill-available"
      margin="12px 0"
      ref={messageContainerRef}
    >
      {messages &&
        messages.map((message, index) => (
          <Flex
            key={message._id}
            alignItems="center"
            gap="12px"
            margin="0 12px 0 0"
            $alignSelf={message.sender._id === user?._id ? "flex-end" : "flex-start"}
          >
            {isSameSender(messages, message, index, user?._id) || isLastMessage(messages, index, user?._id) ? (
              <Container
                width="32px"
                height="32px"
                padding="4px"
                backgroundColor={Theme.colors.violet}
                borderRadius="100%"
                hBackgroundColor={Theme.colors.lightViolet}
                cursor="pointer"
              >
                {user?.pic === defaultProfileUrl ? (
                  <VscAccount size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
                ) : (
                  <Image
                    src={message?.sender?.pic || ""}
                    alt={message?.sender?.name || "user profile photo"}
                    width={24}
                    height={24}
                    style={{ borderRadius: "100%" }}
                  />
                )}
              </Container>
            ) : (
              <Container width="32px" height="32px" padding="4px" $display="hidden"></Container>
            )}
            <Text color={isDark ? Theme.colors.white : Theme.colors.black}>{message.content}</Text>
          </Flex>
        ))}
    </Flex>
  );
};

export default ScrollableChat;
