import { Link } from "react-router-dom";
import { Button, Grid, Header, Icon, Label } from "semantic-ui-react";
import UserIcon from "./UserIcon";

const NavBar = ({ user, logout }) => {
  const { uid, firstName, lastName } = user;
  return (
    <div className="navbar">
      <Grid>
        <Grid.Column width="12" verticalAlign="middle">
          <Header as={Link} to="/" style={{ color: "white" }}>
            <Header.Content className="title">ClubSocial</Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column width="4" verticalAlign="middle">
          <Grid>
            <Grid.Column width="4" textAlign="center">
              <UserIcon src={user.profileImg} />
            </Grid.Column>
            <Grid.Column width="7" verticalAlign="middle">
              <div className="login-info">
                <label>Logged In as</label>
                <Link to={`/user/${uid}`} style={{ color: "white" }}>
                  <span>
                    {firstName} {lastName}
                  </span>
                </Link>
              </div>
            </Grid.Column>
            <Grid.Column width="5" verticalAlign="middle">
              <Label
                as={Button}
                onClick={logout}
                style={{ backgroundColor: "transparent", color: "white" }}
                icon={<Icon name="sign out" />}
                content="Logout"
              />
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default NavBar;
