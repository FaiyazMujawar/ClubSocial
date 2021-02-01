import { Message } from "semantic-ui-react";

const Errors = ({ errors, header }) => {
  let index = 0;
  return (
    <Message error>
      <Message.Header>{header}</Message.Header>
      {errors.map((error) => (
        <Message.Content key={index++}>{error}</Message.Content>
      ))}
    </Message>
  );
};

export default Errors;
