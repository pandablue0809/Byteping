"use client";

import { ChatData } from "@/types";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect, useContext } from "react";

type UserData = {
  email: string;
  name: string;
  pic: string;
  token: string;
  _id: string;
};

type ChatContextType = {
  user: UserData | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>;
  selectedChat: ChatData | undefined;
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatData | undefined>>;
  chats: ChatData[];
  setChats: React.Dispatch<React.SetStateAction<ChatData[]>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface IChatContext {
  children: React.ReactNode;
}

const ChatProvider = ({ children }: IChatContext) => {
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [selectedChat, setSelectedChat] = useState<ChatData | undefined>(undefined);
  const [chats, setChats] = useState<ChatData[]>([]);

  const router = useRouter();

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    let userInfo;
    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
      setUser(userInfo);
    }
    if (!userInfo) {
      router.push("/");
    }
  }, [router]);

  return (
    <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
