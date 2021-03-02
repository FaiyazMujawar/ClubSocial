import { Button, Card, Grid, Header } from "semantic-ui-react";
import { useAuth } from "../../context/Auth";
import UserIcon from "../UserIcon";

const Username = ({ user, action }) => {
  const { user: loggedInUser } = useAuth();

  return (
    <>
      <Card raised fluid centered style={{ padding: "2rem" }}>
        <Grid>
          <Grid.Column width="3" textAlign="right" verticalAlign="middle">
            <Card.Content>
              <UserIcon size={100} src={user.profileImg} />
            </Card.Content>
          </Grid.Column>
          <Grid.Column width="9" textAlign="left" verticalAlign="middle">
            <Header>
              <Header.Content>
                <h1 className="username">
                  {user.firstName} {user.lastName}
                </h1>
              </Header.Content>
              <Header.Subheader>
                <div className="bio">
                  {user.bio || "Hey there! I'm using ClubSocial!"}
                </div>
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column width="4" verticalAlign="middle">
            {loggedInUser.uid === user.uid && (
              <Button
                icon="edit"
                basic
                primary
                content="Edit profile"
                onClick={action}
              />
            )}
          </Grid.Column>
        </Grid>
      </Card>
    </>
  );
};

export default Username;
