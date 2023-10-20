export interface UserData {
  _id: string;
  name: string;
  email: string;
  pic: string;
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
}
