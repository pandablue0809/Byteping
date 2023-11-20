"use client";

import { fetchChats } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { ChatState } from "@/contexts/ChatProvider";
import SideDrawer from "@/components/SideDrawer/SideDrawer";
import MyChats from "@/components/MyChats/MyChats";
import ChatBox from "@/components/ChatBox";
import Container from "@/styles/Container.styled";
import Flex from "@/styles/Flex.styled";
import Text from "@/styles/Text.styled";
import Theme from "@/styles/Theme.styled";
import Link from "next/link";

type Chat = {
  _id: string;
  chatName: string;
};

const Home = () => {
  const { user } = ChatState() || { user: null };

  const {
    data: chats,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["chats", { name: "j" }],
    queryFn: ({ signal }) => fetchChats({ signal, name: "j" }),
    staleTime: 5000,
    gcTime: 1000
  });

  let message;

  if (isLoading) {
    message = (
      <p>
        <Link href={"/chats"}>Loading...</Link>
      </p>
    );
  }

  if (isError) {
    message = <p>{`There is a error: ${error?.message || ""}`}</p>;
  }

  if (chats) {
    message = (
      <div>
        {chats.map((chat: Chat) => (
          <div key={chat._id}>{chat.chatName}</div>
        ))}

        <SideDrawer />

        <Flex backgroundColor="#8EA7E9" textColor="#000" justifyContent="space-between">
          <Container>Search User</Container>
          <Text
            fontFamily={Theme.fonts.secondary}
            fontSize="30px"
            letterSpacing="1.6px"
            wordSpacing="0"
            color="#000000"
            fontWeight="700"
            textDecoration="none"
            fontStyle="normal"
            fontVariant="small-caps"
            textTransform="uppercase"
          >
            BytePing
          </Text>
          <Container>Account</Container>
          <Link href="/chat">chat page link</Link>
        </Flex>

        <section style={{ display: "flex", width: "100%", gap: "30px" }}>
          {user && <MyChats />}
          {user && <ChatBox />}
        </section>
      </div>
    );
  }
  return message;
};

export default Home;
