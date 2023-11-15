import { ChatState } from "@/contexts/ChatProvider";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import { MessageData } from "@/types";
import { getDate, getTime } from "@/utils/date";
import Image from "next/image";
import React, { useContext, useEffect, useRef } from "react";
import { VscAccount } from "react-icons/vsc";
import { PulseLoader } from "react-spinners";

const ScrollableChat = ({ messages, isTyping }: { messages: MessageData[]; isTyping: boolean }) => {
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

  const isSameDate = (msg: MessageData, msgIdx: number, msgs: MessageData[]) => {
    if (msgIdx === 0) return false;
    if (getDate(msgs[msgIdx - 1].createdAt) === getDate(msg.createdAt)) return true;
    return false;
  };

  useEffect(() => {
    messageContainerRef.current?.scrollTo(0, messageContainerRef.current?.scrollHeight);
  }, [messages, isTyping]);

  return (
    <>
      <Flex
        as={"div"}
        $overflowY="auto"
        flexDirection="column"
        gap="12px"
        height="-webkit-fill-available"
        margin="12px 0 0"
        ref={messageContainerRef}
      >
        {messages &&
          messages.map((message, index) => (
            <>
              <Flex $alignSelf="center">
                {!isSameDate(message, index, messages) && (
                  <Text fontSize="16px" color={isDark ? Theme.colors.lightGrey : Theme.colors.extraDarkGrey}>
                    {getDate(message.createdAt)}
                  </Text>
                )}
              </Flex>
              <Flex
                key={message._id}
                alignItems="center"
                gap="12px"
                margin="0 12px 0 0"
                $alignSelf={message.sender._id === user?._id ? "flex-end" : "flex-start"}
              >
                {isSameSender(messages, message, index, user?._id) || isLastMessage(messages, index, user?._id) ? (
                  <Container
                    width="40px"
                    height="40px"
                    padding="8px"
                    backgroundColor={Theme.colors.violet}
                    borderRadius="12px"
                    hBackgroundColor={Theme.colors.lightViolet}
                    cursor="pointer"
                  >
                    {user?.pic !== defaultProfileUrl ? (
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
                  <Container width="40px" height="40px" padding="4px" $display="hidden"></Container>
                )}
                <Flex gap="12px" alignItems="center">
                  <Text fontSize="18px" color={isDark ? Theme.colors.white : Theme.colors.black}>
                    {message.content}
                  </Text>
                  <Flex $alignSelf="flex-end">
                    <Text fontSize="12px" color={isDark ? Theme.colors.lightGrey : Theme.colors.extraDarkGrey}>
                      {getTime(message.createdAt, false)}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </>
          ))}
      </Flex>
      <Flex $alignSelf="flex-start" margin="6px 0" height="24px" alignItems="center">
        {isTyping ? <PulseLoader color={Theme.colors.violet} size={10} /> : <Container height="14px"></Container>}
      </Flex>
    </>
  );
};

export default ScrollableChat;
