import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Form, Header, Icon, Message } from "semantic-ui-react";

import { useAuth } from "../context/Auth";

const LogIn = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const { login } = useAuth();

  const handleSubmit = async () => {
    console.log("handleSubmit");
    try {
      setLoading(true);
      setErrors({
        username: "",
        password: "",
      });
      const { username, password } = credentials;
      await login(username, password);
      console.log("login");
      setLoading(false);
      history.replace("/");
    } catch (error) {
      setErrors(handleErrors(error));
      setLoading(false);
    }
  };

  const handleErrors = (error) => {
    const errors = {
      username: "",
      password: "",
    };

    if (error.code === "auth/user-not-found")
      errors.username = "User not found!";
    else if (error.code === "auth/wrong-password")
      errors.password = "Password incorrect!";

    return errors;
  };

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div style={{ width: "350px" }} className="form-wrap center">
      <Header size="huge" textAlign="center">
        <Header.Content>
          <Icon name="sign in alternate" /> Log In!
        </Header.Content>
      </Header>
      <Card fluid centered>
        <Card.Content textAlign="left">
          <Form>
            <Form.Group>
              <Form.Input
                name="username"
                type="email"
                label="Email"
                width="16"
                icon="user"
                iconPosition="left"
                placeholder="email@example.com"
                value={credentials.username}
                onChange={handleChange}
                error={
                  errors.username !== ""
                    ? { content: errors.username, pointing: "above" }
                    : false
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                name="password"
                type="password"
                label="Password"
                width="16"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                error={
                  errors.password
                    ? { content: errors.password, pointing: "above" }
                    : false
                }
              />
            </Form.Group>
            <Form.Button
              disabled={loading}
              onClick={handleSubmit}
              color="blue"
              fluid
            >
              Log In!
            </Form.Button>
          </Form>
        </Card.Content>
        <Message attached="bottom">
          <Icon name="help" />
          Don't have an account? <Link to="/signup">Sign Up!</Link>
        </Message>
      </Card>
    </div>
  );
};

export default LogIn;
