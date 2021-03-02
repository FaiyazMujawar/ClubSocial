import { Card, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import UserIcon from "./UserIcon";

const Avatar = ({
  uid,
  profileImg,
  authorFirstName,
  authorLastName,
  createdOn,
}) => {
  return (
    <Grid>
      <Grid.Column width="2" textAlign="center">
        <UserIcon src={profileImg} />
      </Grid.Column>
      <Grid.Column width="14" verticalAlign="middle">
        <Card.Header>
          <Link to={`/user/${uid}`}>
            <h3>
              {authorFirstName} {authorLastName}
            </h3>
          </Link>
        </Card.Header>
        {createdOn && (
          <Card.Meta>
            {new Date(createdOn.seconds * 1000).toDateString()}
          </Card.Meta>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Avatar;
