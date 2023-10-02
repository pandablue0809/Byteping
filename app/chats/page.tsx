"use client";

import { motion } from "framer-motion";
import { fetchChats } from "@/util/http";
import { useQuery } from "@tanstack/react-query";

type Chat = {
  _id: string;
  chatName: string;
};

const Home = () => {
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

  const { data: newChat } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchChats
  });

  const childVariants = {
    hidden: {
      opacity: 0,
      x: -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  let message;

  if (isLoading) {
    message = <p>Loading...</p>;
  }

  if (isError) {
    message = <p>{`There is a error: ${error?.message || ""}`}</p>;
  }

  if (chats) {
    message = (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {chats.map((chat: Chat) => (
          <motion.div key={chat._id} variants={childVariants}>
            {chat.chatName}
          </motion.div>
        ))}
        {newChat?.map((chat: Chat) => (
          <motion.div key={chat._id} variants={childVariants}>
            {chat.chatName}
          </motion.div>
        ))}
      </motion.div>
    );
  }
  return message;
};

export default Home;
