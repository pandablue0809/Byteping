import "./Home.css";
import Login from "@/components/authentication/Login";
import SignUp from "@/components/authentication/SignUp";

const Home = () => {
  return (
    <main>
      <h1>BytePing</h1>
      <section className="login-signup-container">
        <Login />
        <SignUp />
      </section>
    </main>
  );
};

export default Home;
