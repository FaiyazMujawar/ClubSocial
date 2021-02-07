import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Form } from "semantic-ui-react";
import Errors from "../components/Errors";

import { useAuth } from "../context/Auth";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const { signup } = useAuth();

  const handleSubmit = async () => {
    if (password === confirmPassword) {
      try {
        setLoading(true);
        setErrors([]);
        await signup(firstName, lastName, dob, gender, email, password);
        setLoading(false);
        history.replace("/");
      } catch (error) {
        setErrors([error.message]);
        setLoading(false);
      }
    } else setErrors(["Passwords do not match!"]);
  };

  return (
    <div className="form">
      <Card centered style={{ width: "600px" }}>
        <Card.Header textAlign="center">
          <h1>Sign Up!</h1>
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
                type="text"
                label="First Name"
                width="8"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Your first name..."
              />
              <Form.Input
                type="text"
                label="Last Name"
                width="8"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Your last name..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                type="date"
                label="Date of Birth"
                value={dob}
                width="8"
                onChange={(event) => setDob(event.target.value)}
              />
              <Form.Group inline>
                <label>Gender</label>
                <Form.Radio
                  label="Male"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(_) => setGender("Male")}
                />
                <Form.Radio
                  label="Female"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(_) => setGender("Female")}
                />
                <Form.Radio
                  label="Other"
                  value="Other"
                  checked={gender === "Other"}
                  onChange={(_) => setGender("Other")}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Input
                type="email"
                label="Email"
                width="16"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                type="password"
                label="Password"
                width="16"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                type="password"
                label="Confirm Password"
                width="16"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Form.Group>
            <Form.Button
              fluid
              disabled={loading}
              onClick={handleSubmit}
              color="blue"
            >
              Sign Up!
            </Form.Button>
          </Form>
        </Card.Content>
        <Card.Content textAlign="center">
          Already have an account? <Link to="/login">Log In!</Link>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SignUp;
