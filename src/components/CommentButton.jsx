import { Icon, Label } from "semantic-ui-react";

const CommentButton = ({ commentCount, onClick }) => {
  return (
    <Label
      onClick={onClick}
      style={{ backgroundColor: "transparent" }}
      icon={<Icon name="comments" size="large" color="blue" />}
      content={commentCount}
    />
  );
};

export default CommentButton;
