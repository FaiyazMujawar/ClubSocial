import { Card } from "semantic-ui-react";
import { BiCake, FaHeart, FaMars } from "react-icons/all";

import ListTile from "../ListTile";

const About = ({ user }) => {
  return (
    <Card raised fluid>
      <Card.Content>
        <div style={{ padding: "10px" }}>
          <h3 style={{ paddingBottom: "5px" }}>About {user.firstName}</h3>
          <ListTile
            description={"Date of Birth"}
            header={[...user.dob.split("-").reverse()].join("/")}
            icon={<BiCake size="2rem" />}
          />
          <ListTile
            description={"Gender"}
            header={user.gender}
            icon={<FaMars size="2rem" />}
          />
          <ListTile
            description={"Relationship Status"}
            header={user.relationshipStatus}
            icon={<FaHeart size="2rem" />}
          />
        </div>
      </Card.Content>
    </Card>
  );
};

export default About;
