import { ChatState } from "@/context/ChatProvider";
import Image from "next/image";
import React from "react";

const ProfileModal = () => {
  const { user } = ChatState() || { user: null };

  return (
    <div>
      <p>{user?.name}</p>
      <Image src={user?.pic || ""} alt="profile picture of user" width={25} height={25} />
      <p>{user?.email}</p>
    </div>
  );
};

export default ProfileModal;
