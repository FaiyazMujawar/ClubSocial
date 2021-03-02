import React, { useEffect, useState } from "react";
import { Card, Grid, Placeholder } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import getUser from "../functions/GetUser";
import Username from "../components/userpage/Username";
import About from "../components/userpage/About";
import getUserPosts from "../functions/GetUserPosts";
import EditProfile from "../components/userpage/EditProfile";
import { useAuth } from "../context/Auth";

const User = () => {
  const { id } = useParams();
  const { logout, user: loggedInUser } = useAuth();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUser(id).then((userData) => setUser(userData));
    getUserPosts(id).then((posts) => setPosts(posts));
  }, [id]);

  return user ? (
    <div>
      <EditProfile
        open={open}
        setOpen={setOpen}
        user={user}
        setUser={setUser}
      />
      <Navbar user={loggedInUser} logout={() => logout()} />
      <div className="container">
        <Username user={user} action={() => setOpen(true)} />
        <Grid>
          <Grid.Column width="5">
            <div className="about">
              <About user={user} />
            </div>
          </Grid.Column>
          <Grid.Column width="11">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard post={post} key={post.id} />)
            ) : (
              <Card>
                <Card.Content>
                  <div className="text-muted">No Posts!</div>
                </Card.Content>
              </Card>
            )}
          </Grid.Column>
        </Grid>
      </div>
    </div>
  ) : (
    <Placeholder />
  );
};

export default User;
