import { Button } from "semantic-ui-react";

import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/Auth";
import useFirestore from "../hooks/useFirestore";

const Home = () => {
  const { user, logout } = useAuth();
  const { data: posts } = useFirestore("posts");

  return (
    <div className="container">
      <h1>
        Welcome, {user.firstName}
        <Button floated="right" onClick={logout}>
          Log out
        </Button>
      </h1>
      <CreatePost />
      {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  );
};

export default Home;
