import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Form } from "semantic-ui-react";
import Errors from "../components/Errors";

import { useAuth } from "../context/Auth";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrors([]);
      await login(email, password);
      setLoading(false);
      history.replace("/");
    } catch (error) {
      setErrors([error.message]);
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <Card centered>
        <Card.Header textAlign="center">
          <h1>Log In!</h1>
        </Card.Header>
        {errors.length > 0 && (
          <Card.Content textAlign="left">
            <Errors errors={errors} header="Failed to Log in!" />
          </Card.Content>
        )}
        <Card.Content textAlign="left">
          <Form>
            <Form.Group>
              <Form.Input
                type="email"
                label="Email"
                width="16"
                icon="user"
                iconPosition="left"
                placeholder="email@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                type="password"
                label="Password"
                width="16"
                icon="key"
                iconPosition="left"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Form.Button disabled={loading} onClick={handleSubmit} color="blue">
              Log In!
            </Form.Button>
          </Form>
        </Card.Content>
        <Card.Content textAlign="center">
          Don't have an account? <Link to="/signup">Sign Up!</Link>
        </Card.Content>
      </Card>
    </div>
  );
};

export default LogIn;
