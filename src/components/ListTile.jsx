import { Grid, Header } from "semantic-ui-react";

const ListItem = ({ icon, header, description }) => {
  return (
    <Grid>
      <Grid.Column width="3" verticalAlign="middle">
        {icon}
      </Grid.Column>
      <Grid.Column width="13">
        <Header>
          <Header.Content>
            <h4>{header || "Unknown"}</h4>
          </Header.Content>
          <Header.Subheader>
            <span>{description}</span>
          </Header.Subheader>
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default ListItem;
