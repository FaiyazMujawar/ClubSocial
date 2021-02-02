import { Button } from "semantic-ui-react";
import { useAuth } from "../context/Auth";

const Home = () => {
  const { logout } = useAuth();
  return (
    <>
      <h1>Home Page</h1>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};

export default Home;
