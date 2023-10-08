import React from "react";
import { ChatState } from "@/context/ChatProvider";
import Image from "next/image";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useRouter } from "next/navigation";

const SideDrawer = () => {
  const { user } = ChatState() || { user: null };
  // const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState(false);
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    router.push("/");
  };
  return (
    <>
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
        <button>Search</button>
        <h1>BytePing</h1>
        <section>
          <button>Notification</button>
          <span>{user?.name}</span>
          <span>
            <Image src={user?.pic || ""} alt="profile picture of user" width={25} height={25} />
          </span>
          <div>
            <p>My Profile</p>
            <p onClick={logoutHandler}>Logout</p>
          </div>
          <ProfileModal />
        </section>
      </nav>
    </>
  );
};

export default SideDrawer;
