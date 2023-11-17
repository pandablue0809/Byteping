export interface UserData {
  _id: string;
  name: string;
  email: string;
  pic: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface LatestMessage {
  _id: string;
  sender: UserData;
  content: string;
  chat: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ChatData {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: UserData[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  groupAdmin?: UserData;
  latestMessage: LatestMessage;
}

export interface MessageData {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
    pic: string;
  };
  content: string;
  chat: {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: UserData[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    latestMessage: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
