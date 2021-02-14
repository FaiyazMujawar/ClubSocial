import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Header, Icon, Card, Message } from "semantic-ui-react";

import { useAuth } from "../context/Auth";

const SignUp = () => {
  const initState = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: null,
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [userDetails, setUserDetails] = useState(initState);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();

  const { signup } = useAuth();

  const genderOptions = [
    { text: "Male", value: "male" },
    { text: "Female", value: "female" },
    { text: "Other", value: "other" },
  ];

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const validateData = () => {
    if (new Date() <= new Date("1998-01-01")) {
      return { ...errors, dob: "Enter a valid Date of Birth" };
    }
    return null;
  };

  const handleErrors = (error) => {
    const errors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (error.code === "auth/email-already-in-use")
      errors.email = "That email is already used!";
    if (userDetails.password !== userDetails.confirmPassword)
      errors.confirmPassword = "Password & Confirm Password must match";

    return errors;
  };

  const handleSubmit = async () => {
    const { firstName, lastName, dob, gender, email, password } = userDetails;
    try {
      setLoading(true);
      setErrors({
        dob: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      const errors = validateData();
      if (!errors) {
        await signup(firstName, lastName, dob, gender, email, password);
        history.replace("/");
      } else setErrors(errors);
    } catch (error) {
      console.log(error);
      setErrors(handleErrors(error));
    }
    setLoading(false);
  };

  return (
    <div style={{ width: "500px" }} className="form-wrap center">
      <Header size="huge" textAlign="center">
        <Header.Content>
          <Icon name="sign in" /> Sign Up!
        </Header.Content>
      </Header>
      <Card centered style={{ width: "600px" }}>
        <Card.Content textAlign="left">
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                name="firstName"
                required
                value={userDetails.firstName}
                label="First name"
                onChange={handleChange}
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="lastName"
                required
                value={userDetails.lastName}
                label="Last name"
                onChange={handleChange}
                placeholder="Last name"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                name="dob"
                required
                label="Date of Birth"
                type="date"
                value={userDetails.dob}
                onChange={handleChange}
                error={
                  errors.dob
                    ? { content: errors.dob, pointing: "above" }
                    : false
                }
              />
              <Form.Select
                name="gender"
                required
                options={genderOptions}
                value={userDetails.gender}
                label={{
                  children: "Gender",
                }}
                onChange={(_, { value }) =>
                  setUserDetails({ ...userDetails, gender: value })
                }
                placeholder="Gender"
              />
            </Form.Group>
            <Form.Input
              required
              name="email"
              type="email"
              label="Email"
              value={userDetails.email}
              onChange={handleChange}
              placeholder="joe@schmoe.com"
              error={
                errors.email
                  ? { content: errors.email, pointing: "above" }
                  : false
              }
            />
            <Form.Input
              required
              minLength={6}
              name="password"
              type="password"
              label="Password"
              value={userDetails.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <Form.Input
              required
              minLength={6}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={userDetails.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              error={
                errors.confirmPassword
                  ? { content: errors.confirmPassword, pointing: "above" }
                  : false
              }
            />
            <Form.Button
              primary
              fluid
              onClick={handleSubmit}
              disabled={loading}
              content="Sign Up!"
            />
          </Form>
        </Card.Content>
        <Message attached="bottom">
          <Icon name="help" />
          Already have an account? <Link to="/login">Log In!</Link>
        </Message>
      </Card>
    </div>
  );
};

export default SignUp;
