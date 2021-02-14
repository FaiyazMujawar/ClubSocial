import { Button, Grid, Header, Icon, Label } from "semantic-ui-react";

const NavBar = ({ user, logout }) => {
  const { firstName, lastName } = user;
  return (
    <div className="navbar">
      <Grid>
        <Grid.Column width="12" verticalAlign="middle">
          <Header style={{ color: "white" }}>
            <Header.Content className="title">ClubSocial</Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column width="4" verticalAlign="middle">
          <Grid>
            <Grid.Column width="4" textAlign="center">
              <img
                src="https://img.icons8.com/color/64/000000/user-male-circle--v1.png"
                alt="profile"
              />
            </Grid.Column>
            <Grid.Column width="7" verticalAlign="middle">
              <div className="login-info">
                <label>Logged In as</label>
                <span>
                  {firstName} {lastName}
                </span>
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
