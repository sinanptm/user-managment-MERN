import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer.jsx";
import { toast } from "react-toastify";
import Spinner from "../../components/SpinnerComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/usersApiSlice.js";
import { setCredentials } from "../../slices/authSlice.js";
import isValidEmail from "../../utils/isValidEmail.js";
import { uploadImageToCloudinary } from "../../utils/Cloudinary.js";
import { useLoading } from "../../provider/IsLoadingProvider.jsx";

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, setLoading } = useLoading();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const toastStyle = {
    autoClose: 1000,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;

    if (file) {
      if (file.size > maxSize) {
        toast.error("File size too large. Maximum size is 10 MB");
        document.getElementById("image").value = "";
        setFormData((prevData) => ({
          ...prevData,
          image: "",
        }));
        setImagePreview("");
        return;
      }

      if (file.type.startsWith("image/")) {
        setFormData((prevData) => ({
          ...prevData,
          image: file,
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Profile image must be a valid image");
        document.getElementById("image").value = "";
        setFormData((prevData) => ({
          ...prevData,
          image: "",
        }));
        setImagePreview("");
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, number, image } = formData;

    if (name.trim() === "") {
      toast.error("Name cannot be empty", toastStyle);
    } else if (number.length < 10) {
      toast.error("Phone number should be at least 10 characters", toastStyle);
    } else if (password.trim().length < 4) {
      toast.error("Password should be at least 4 letters", toastStyle);
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastStyle);
    } else if (!isValidEmail(email)) {
      toast.error("Email format is incorrect", toastStyle);
    } else {
      try {
        let imageUrl = "";

        if (image) {
          imageUrl = await uploadImageToCloudinary(image, setLoading);
        } else {
          toast.error("Profile image is required", toastStyle);
          return;
        }
        const res = await register({
          name,
          email,
          password,
          number,
          image: imageUrl,
        }).unwrap();
        setImagePreview("");
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Sign Up successful");
      } catch (error) {
        toast.error(error.message || error.data.message, toastStyle);
        setImagePreview("");
      }
    }
  };

  if (isLoading || loading) {
    return <Spinner />;
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="number">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="number"
            placeholder="Enter phone number"
            value={formData.number}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control type="file" id="image" onChange={handleImageChange} />
        </Form.Group>
        {imagePreview && (
          <Col xs={4} md={3}>
            <Image src={imagePreview} thumbnail />
          </Col>
        )}
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>
        <Row className="py-3">
          <Col>
            Already have an account? <Link to={"/login"}>Sign In</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
