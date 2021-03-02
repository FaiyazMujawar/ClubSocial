import { useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";

import CreatePostModal from "../components/CreatePostModal";
import NavBar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/Auth";
import useFirestore from "../hooks/useFirestore";

const Home = () => {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();
  const { data: posts } = useFirestore("posts");

  return (
    <div className="home">
      <NavBar user={user} logout={logout} />
      <div className="container">
        <CreatePostModal open={open} setOpen={setOpen} />
        {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
      <Button
        className="create-post-button"
        floated="right"
        content="Create Post"
        circular
        icon="add"
        onClick={() => setOpen(true)}
      />
      <footer>
        <Label circular size="large">
          <Icon name="lightbulb outline" />
          All caught up!
        </Label>
      </footer>
    </div>
  );
};

export default Home;
