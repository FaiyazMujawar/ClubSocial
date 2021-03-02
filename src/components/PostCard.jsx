import { useRef, useState } from "react";
import { Button, Card, Input } from "semantic-ui-react";

import Avatar from "./Avatar";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import PostModal from "./PostModal";
import postComment from "../functions/PostComment";
import { useAuth } from "../context/Auth";

const PostCard = ({ post }) => {
  const {
    id,
    text,
    firstName: authorFirstName,
    lastName: authorLastName,
    media,
    likeCount,
    createdOn,
    commentCount: comments,
  } = post;

  const {
    user: { uid: userId, firstName, lastName },
  } = useAuth();

  const [open, setOpen] = useState(false);

  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(comments);
  const [uploadingComment, setUploadingComment] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async () => {
    setUploadingComment(true);
    try {
      await postComment(id, userId, firstName, lastName, comment);
      setCommentCount(commentCount + 1);
    } catch (error) {}
    setUploadingComment(false);
    setComment("");
  };

  return (
    <Card className="postcard" raised fluid>
      <PostModal
        incrementCount={setCommentCount}
        post={post}
        open={open}
        setOpen={setOpen}
      />
      <Card.Content>
        <Avatar
          uid={post.userId}
          profileImg={post.userProfile}
          createdOn={createdOn}
          authorFirstName={authorFirstName}
          authorLastName={authorLastName}
        />
      </Card.Content>
      {text && (
        <Card.Content onClick={() => setOpen(true)}>
          <div>{text}</div>
        </Card.Content>
      )}
      {media && (
        <div className="img-wrap">
          <img onClick={() => setOpen(true)} alt="post-media" src={media} />
        </div>
      )}
      <Card.Content extra>
        <LikeButton postId={id} userId={userId} likes={likeCount} />
        <CommentButton
          commentCount={commentCount}
          onClick={() => inputRef.current.focus()}
        />
        <Input
          fluid
          size="mini"
          ref={inputRef}
          value={comment}
          icon="comment"
          iconPosition="left"
          placeholder="Write a comment"
          loading={uploadingComment}
          onChange={(event) => setComment(event.target.value)}
          action={
            <Button
              color="blue"
              disabled={comment.trim().length === 0}
              icon="edit"
              onClick={handleSubmit}
            />
          }
        />
      </Card.Content>
    </Card>
  );
};

export default PostCard;
