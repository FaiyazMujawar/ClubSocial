import { useRef, useState } from "react";
import { Button, Divider, Form, Grid, Modal } from "semantic-ui-react";

import UserIcon from "../UserIcon";
import updateUser from "../../functions/UpdateUser";
import deleteImage from "../../functions/DeleteImage";
import saveImage from "../../functions/SaveImage";
import useFile from "../../hooks/useFile";

const EditProfile = ({ open, setOpen, user, setUser }) => {
  const [values, setValues] = useState({ ...user });
  const [file, setFile] = useState(null);

  let removePicture = false;

  const { loading, imageSrc } = useFile(file);

  const inputRef = useRef(null);

  const genderOptions = [
    { text: "Male", value: "male" },
    { text: "Female", value: "female" },
    { text: "Other", value: "other" },
  ];

  const relationshipOptions = [
    { text: "Single", value: "Single" },
    { text: "In a relationship", value: "In a relationship" },
  ];

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = async () => {
    if (removePicture) {
      await deleteImage(user.profileImg);
    }
    console.log(values);
    if (file) {
      await deleteImage(user.profileImg);
      await saveImage(
        file,
        (_err) => {},
        (url) => updateUser({ ...values, profileImg: url })
      );
      console.log("updated");
    } else {
      for (const key in values) {
        if (values[key] !== user[key]) {
          await updateUser(values);
          console.log("updated");
          break;
        }
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setValues(user);
        setFile(null);
        setOpen(false);
      }}
      closeIcon
      closeOnDimmerClick={false}
    >
      <Modal.Content>
        <h1>Edit profile</h1>
      </Modal.Content>
      <Divider fitted />
      <Modal.Content>
        <Grid>
          <Grid.Column width="2" textAlign="center" verticalAlign="middle">
            <UserIcon src={imageSrc || user.profileImg} />
          </Grid.Column>
          <Grid.Column width="14" verticalAlign="middle">
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
              primary
              loading={loading}
              content="Change Picture"
              onClick={() => inputRef.current.click()}
            />
            <Button
              basic
              color="red"
              disabled={!user.profileImg}
              onClick={() => {
                removePicture = true;
                setValues({
                  ...values,
                  profileImg: null,
                });
              }}
              content="Remove picture"
            />
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Divider fitted />
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              label="First Name"
              editable="false"
              value={values.firstName}
            />
            <Form.Input
              label="Last Name"
              editable="false"
              value={values.lastName}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Date of Birth"
              type="date"
              value={values.dob}
              onChange={handleChange}
            />
            <Form.Select
              name="relationshipStatus"
              options={relationshipOptions}
              label={{
                children: "Relationship Status",
              }}
              value={values.relationshipStatus}
              onChange={(_, { value }) =>
                setValues({ ...values, relationshipStatus: value })
              }
              placeholder="Relationship Status"
            />
            <Form.Select
              name="gender"
              options={genderOptions}
              value={values.gender}
              label="Gender"
              onChange={(_, { value }) =>
                setValues({ ...values, gender: value })
              }
              placeholder="Gender"
            />
          </Form.Group>
          <Form.Input
            label="Bio"
            name="bio"
            value={values.bio}
            onChange={handleChange}
            placeholder="Hey there! I'm using ClubSocial!"
          />
        </Form>
      </Modal.Content>
      <Divider fitted />
      <Modal.Content>
        <Button
          primary
          onClick={() => {
            handleUpdate().then(() => {
              setUser(values);
              setFile(null);
              setOpen(false);
            });
          }}
        >
          Update
        </Button>
        <Button
          primary
          basic
          onClick={() => {
            setValues(user);
            setOpen(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Content>
    </Modal>
  );
};

export default EditProfile;
