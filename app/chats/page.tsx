"use client";

import { useEffect, useState } from "react";

type Chat = {
  _id: string;
  chatName: string;
};

const Home = () => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch("http://localhost:5000/api/chats");
      const data = await response.json();
      setChats(data);
    };
    fetchChats();
  }, [setChats]);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Home;
