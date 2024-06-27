import React, { useState, useEffect } from "react";
import { Button, Form, Image } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import { toast } from "react-toastify";
import Spinner from "../components/SpinnerComponent";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import isValidEmail from "../utils/isValidEmail.js";
import { uploadImageToCloudinary } from "../utils/Cloudinary.js";
import { useLoading } from "../provider/IsLoadingProvider.jsx";

const ProfileContainer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const { loading, setLoading } = useLoading();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  let [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setNumber(userInfo.number);
    setImage(userInfo.image);
    setImagePreview(userInfo.image);
  }, [userInfo.name, userInfo.email, userInfo.number, userInfo.image]);

  const toastStyle = {
    autoClose: 1000,
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;

    if (file) {
      if (file.size > maxSize) {
        toast.error("File size too large. Maximum size is 10 MB", toastStyle);
        setImage(null);
        setImagePreview("");
        return;
      }

      if (file.type.startsWith("image/")) {
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Profile image must be a valid image", toastStyle);
        setImage(null);
        setImagePreview("");
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      toast.error("Name cannot be empty", toastStyle);
    } else if (number.length < 10) {
      toast.error("Phone number should be at least 10 characters", toastStyle);
    } else if (password.length > 0 && password.trim().length < 4) {
      toast.error("Password should be at least 4 characters", toastStyle);
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastStyle);
    } else if (!isValidEmail(email)) {
      toast.error("Email format is incorrect", toastStyle);
    } else {
      try {
        let imageUrl = image;

        if (image && typeof image !== "string") {
          imageUrl = await uploadImageToCloudinary(image, setLoading);
        }

        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          number,
          image: imageUrl,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated", toastStyle);
      } catch (error) {
        toast.error(error, toastStyle);
      }
    }
  };

  if (isLoading || loading) {
    return <Spinner />;
  }

  return (
    <FormContainer>
      <h2 className="mb-4 text-center">Update Profile</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-pill"
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-pill"
          />
        </Form.Group>

        <Form.Group controlId="number">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="rounded-pill"
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
            className="rounded-pill"
          />
          {imagePreview && (
            <div className="mt-2 text-center">
              <Image
                src={imagePreview}
                roundedCircle
                style={{ width: "120px", height: "120px" }}
              />
            </div>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-pill"
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-pill"
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="btn-block rounded-pill mt-4"
        >
          Update Profile
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileContainer;