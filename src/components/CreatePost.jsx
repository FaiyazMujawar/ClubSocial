import { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Icon, Label, TextArea } from "semantic-ui-react";
import useStorage from "../hooks/useStorage";
import useFile from "../hooks/useFile";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [post, setPost] = useState(null);
  const [file, setFile] = useState(null);

  const inputRef = useRef();

  const user = {
    uid: "yRvVtqMzlhSqWV3ofox9pUlV5js2",
    firstName: "John",
    lastName: "Doe",
  };

  const { isLoading } = useStorage(post);

  const { imageSrc } = useFile(file);

  const handleSubmit = () => {
    setPost({
      uid: user.uid,
      text: text,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      media: file,
    });
  };

  useEffect(() => {
    if (!isLoading) setPost(null);
  }, [isLoading]);

  // TODO: implement uploading post indication

  // TODO: clear all the inputs after post is uploaded
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Create Post</Card.Header>
      </Card.Content>
      <Card.Content>
        <Form>
          <TextArea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="What's on your mind?"
          />
        </Form>
      </Card.Content>
      {imageSrc && (
        <Card.Content>
          <img width="100%" src={imageSrc} alt="selected file"></img>
        </Card.Content>
      )}
      <Card.Content extra>
        <Button
          as="div"
          labelPosition="right"
          onClick={() => inputRef.current.click()}
        >
          <Button basic>
            <Icon name="images" color="green" size="large" />
            Photo/Video
          </Button>
          <Label basic pointing="left">
            Add media to your post
          </Label>
        </Button>
        <input
          ref={inputRef}
          hidden
          type="file"
          onChange={(event) => {
            const file = event.target.files[0];
            if (file) setFile(file);
          }}
        />
        <Button
          color="blue"
          floated="right"
          content="Post!"
          onClick={handleSubmit}
        />
      </Card.Content>
    </Card>
  );
};

export default CreatePost;
