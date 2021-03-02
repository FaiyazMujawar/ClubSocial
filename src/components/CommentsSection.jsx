import { Comment, Header } from "semantic-ui-react";

const CommentsSection = ({ commentsList }) => {
  console.log(commentsList);
  let index = 0;
  return (
    <div className="comment-section">
      <Comment.Group className="full-width">
        <Header as="h3">Comments</Header>
        {commentsList.length === 0 && (
          <div className="no-comment text-muted">
            Be the first one to comment!
          </div>
        )}
        {commentsList.map((comment) => (
          <Comment key={index++}>
            <Comment.Avatar src="https://img.icons8.com/color/64/000000/user-male-circle--v1.png" />
            <Comment.Content>
              <Comment.Author>
                {comment.firstName} {comment.lastName}
              </Comment.Author>
              {/* <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata> */}
              <Comment.Text>{comment.comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </div>
  );
};

export default CommentsSection;
