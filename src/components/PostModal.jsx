import { useEffect, useRef, useState } from "react";
import { Button, Card, Input, Modal, Grid, Icon } from "semantic-ui-react";

import Avatar from "./Avatar";
import CommentsSection from "./CommentsSection";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";
import postComment from "../functions/PostComment";
import getComments from "../functions/GetComments";
import deletePost from "../functions/DeletePost";
import { useAuth } from "../context/Auth";

const PostCard = ({ post, setOpen, open, incrementCount }) => {
  const {
    id,
    text,
    firstName: authorFirstName,
    lastName: authorLastName,
    media,
    likeCount,
    commentCount: comments,
  } = post;

  const {
    user: { uid: userId, firstName, lastName },
  } = useAuth();

  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(comments);
  const [commentsList, setCommentsList] = useState([]);
  const [uploadingComment, setUploadingComment] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    getComments(id).then((list) => setCommentsList(list));
  }, [id]);

  const handleSubmit = async () => {
    setUploadingComment(true);
    try {
      const newComment = await postComment(
        id,
        userId,
        firstName,
        lastName,
        comment
      );
      setCommentCount(commentCount + 1);
      incrementCount(commentCount);
      setCommentsList([newComment, ...commentsList]);
    } catch (error) {}
    setUploadingComment(false);
    setComment("");
  };

  const handleDelete = async () => {
    deletePost(id, media);
    setOpen(false);
  };

  return (
    <Modal
      size="large"
      open={open}
      onClose={() => setOpen(false)}
      closeIcon
      closeOnDimmerClick={false}
    >
      <Modal.Content>
        <Grid>
          <Grid.Column width="10">
            {/* Post Content */}
            <Card style={{ height: "100%" }} fluid>
              <Card.Content>
                <Avatar
                  authorFirstName={authorFirstName}
                  authorLastName={authorLastName}
                />
              </Card.Content>
              <Card.Content style={{ height: "100%" }}>
                <p>{text}</p>
              </Card.Content>
              {media && <img alt="post-media" width="100%" src={media} />}
              <Card.Content>
                <Grid>
                  <Grid.Column width="14" verticalAlign="middle">
                    <LikeButton likes={likeCount} postId={id} userId={userId} />
                    <CommentButton commentCount={comments} onClick={() => {}} />
                  </Grid.Column>
                  <Grid.Column
                    width="2"
                    verticalAlign="middle"
                    textAlign="center"
                  >
                    <Icon color="red" onClick={handleDelete} name="trash" />
                  </Grid.Column>
                </Grid>
              </Card.Content>
            </Card>
          </Grid.Column>

          {/* Comments */}
          <Grid.Column width="6">
            <Card style={{ height: "100%" }} fluid>
              <Card.Content>
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
              <Card.Content style={{ height: "100%" }}>
                <Modal.Content scrolling>
                  <CommentsSection commentsList={commentsList} />
                </Modal.Content>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  );
};

export default PostCard;
