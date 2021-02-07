import { Card, Grid } from "semantic-ui-react";

const Avatar = ({ authorFirstName, authorLastName }) => {
  return (
    <Grid>
      <Grid.Column width="2" textAlign="center">
        <img
          src="https://img.icons8.com/color/64/000000/user-male-circle--v1.png"
          alt="profile"
        />
      </Grid.Column>
      <Grid.Column width="14" verticalAlign="middle">
        <Card.Header>
          <h3>
            {authorFirstName} {authorLastName}
          </h3>
        </Card.Header>
        <Card.Meta>6 February 2021</Card.Meta>
      </Grid.Column>
    </Grid>
  );
};

export default Avatar;
