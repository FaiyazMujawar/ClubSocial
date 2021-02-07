import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Dimmer,
  Form,
  Icon,
  Label,
  Loader,
  Message,
  TextArea,
} from "semantic-ui-react";

import useStorage from "../hooks/useStorage";
import useFile from "../hooks/useFile";
import { useAuth } from "../context/Auth";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [post, setPost] = useState(null);
  const [file, setFile] = useState(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const { user } = useAuth();

  const inputRef = useRef();

  const { isLoading } = useStorage(post);

  const { imageSrc } = useFile(file);

  const handleSubmit = () => {
    setPost({
      uid: user.uid,
      text: text,
      firstName: user.firstName,
      lastName: user.lastName,
      media: file,
    });
  };

  useEffect(() => {
    if (!isLoading) {
      if (post) {
        setShowSuccessMsg(true);
        setInterval(() => {
          setShowSuccessMsg(false);
        }, 2000);
      }
      setPost(null);
      setFile(null);
      setText("");
    }
  }, [isLoading, post]);

  return (
    <Card fluid>
      {showSuccessMsg && (
        <Card.Content>
          <Message floating success content={"Post uploaded"} />
        </Card.Content>
      )}
      <Card.Content>
        <Card.Header>
          <h3>Create Post</h3>
        </Card.Header>
      </Card.Content>
      <Dimmer inverted active={isLoading}>
        <Loader content={"Uploading post!"} />
      </Dimmer>
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
          disabled={text.trim().length === 0 && file === null}
          onClick={handleSubmit}
        />
      </Card.Content>
    </Card>
  );
};

export default CreatePost;
