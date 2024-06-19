import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer.jsx";
import { toast } from "react-toastify";
import Spinner from "../components/SpinnerComponent";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../Slices/usersApiSlice";
import { setCredentials } from "../Slices/authSlice";
import isValidEmail from "../utils/isValidEmail.js";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      toast.error("Name cannot be empty", toastStyle);
    } else if (password.trim().length < 4) {
      toast.error("Password Should be atleast 4 letters", toastStyle);
    } else if (password !== confirmPassword) {
      toast.error("Password do not match", toastStyle);
    } else if (!isValidEmail(email)) {
      toast.error("Email format is incorrect", toastStyle);
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (error) {
        toast.error(error.data.message, toastStyle);
      }
    }
  };

  if (isLoading) {
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
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
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
