import React, { useState, useEffect, isValidElement } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import isValidEmail from "../utils/isValidEmail";

const EditUserForm = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/admin/user/${id}`);
        setUser(response.data);
        setFormData({
          name: response.data.name,
          number: response.data.number,
          email: response.data.email,
        });
      } catch (error) {
        navigate("/admin");
        toast.error("User Not Found");
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toastStyle = {
    autoClose: 1000,
  };

  const handleSubmit = async (e) => {
    const {email,name,number} = formData
    e.preventDefault();
    if (name.trim() === "") {
      toast.error("Name cannot be empty", toastStyle);
    } else if (number.length < 10) {
      toast.error("Phone number should be atleast 10 characters", toastStyle);
    } else if (!isValidEmail(email)) {
      toast.error("Email format is incorrect", toastStyle);
    } else {
      try {
        await axios.put(`/api/admin/users/${id}`, formData);
        navigate("/admin");
        toast.success("User updated successfully");
      } catch (error) {
        toast.error("Error updating user:", error);
      }
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number</Form.Label>
          <Form.Control
            type="text"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/admin")}
          className="ms-2"
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EditUserForm;
