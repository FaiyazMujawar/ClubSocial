import { Button, Card, Grid, Icon } from "semantic-ui-react";

const PostCard = ({
  post: { text, userFirstName, userLastName, createdAt },
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Grid>
          <Grid.Column width="2">
            <img
              src="https://img.icons8.com/color/56/000000/user-male-circle--v1.png"
              alt="profile"
            />
          </Grid.Column>
          <Grid.Column width="14" verticalAlign="middle">
            <Card.Header>
              <h3>
                {userFirstName} {userLastName}
              </h3>
            </Card.Header>
            <Card.Meta>6 February 2021</Card.Meta>
          </Grid.Column>
        </Grid>
      </Card.Content>
      <Card.Content>{text}</Card.Content>
      <Card.Content extra>
        <Button
          compact
          size="tiny"
          style={{ backgroundColor: "transparent" }}
          icon={<Icon size="large" name="like" />}
        />
        <Button
          compact
          size="tiny"
          style={{ backgroundColor: "transparent" }}
          icon={<Icon size="large" name="comments" color="blue" />}
        />
      </Card.Content>
    </Card>
  );
};

export default PostCard;
