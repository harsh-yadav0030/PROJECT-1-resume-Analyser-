import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router";

const Home = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <main>
      <h1>Home page</h1>

      <button onClick={logoutUser}>
        Logout
      </button>
    </main>
  );
};

export default Home;