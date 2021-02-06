import { Button } from "semantic-ui-react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/Auth";
import useFirestore from "../hooks/useFirestore";

const Home = () => {
  const { logout } = useAuth();
  // const { data: posts } = useFirestore("posts");
  const user = {
    firstName: "John",
    lastName: "Doe",
  };

  const post = {
    createdAt: "6 February 2021 at 19:37:33 UTC+5:30",
    text: "new Post",
    userFirstName: "John",
    userId: "yRvVtqMzlhSqWV3ofox9pUlV5js2",
    userLastName: "Doe",
  };

  return (
    <div className="container">
      <h1>
        Welcome, {user?.firstName || "user"}
        <Button onClick={logout}>Log out</Button>
      </h1>
      <CreatePost />
      <PostCard post={post} />
      {/* {posts && posts.map((post) => <PostCard key={post.id} post={post} />)} */}
    </div>
  );
};

export default Home;
