import { Button } from "semantic-ui-react";
import { useAuth } from "../context/Auth";

const Home = () => {
  const { logout, user } = useAuth();
  return (
    <>
      <h1>Welcome, {user?.firstName || "user"}</h1>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};

export default Home;
