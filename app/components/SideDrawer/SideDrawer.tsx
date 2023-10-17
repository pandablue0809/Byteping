import React, { useContext } from "react";
import { ChatState } from "@/contexts/ChatProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { VscAccount } from "react-icons/vsc";
import { DarkLightModeContext } from "@/contexts/DarkLightModeProvider";
import Theme from "@/styles/Theme.styled";

const SideDrawer = () => {
  const { user } = ChatState() || { user: null };
  // const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [loadingChat, setLoadingChat] = useState(false);
  const router = useRouter();
  const { isDark } = useContext(DarkLightModeContext)!;

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
            {user?.pic ? (
              <Image src={user?.pic || ""} alt={user.name} width={24} height={24} style={{ borderRadius: "50%" }} />
            ) : (
              <VscAccount size={24} fill={isDark ? Theme.colors.black : Theme.colors.white} />
            )}
          </div>
        </section>
      </nav>
    </>
  );
};

export default SideDrawer;
