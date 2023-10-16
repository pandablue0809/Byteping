"use client";

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
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

const ChatContext = createContext<ChatContextType | null>(null);

interface IChatContext {
  children: React.ReactNode;
}

const ChatProvider = ({ children }: IChatContext) => {
  const [user, setUser] = useState<UserData | null>(null);

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

  return <ChatContext.Provider value={{ user, setUser }}>{children}</ChatContext.Provider>;
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
