import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Col, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import isValidEmail from "../../utils/isValidEmail";
import { uploadImageToCloudinary } from "../../utils/Cloudinary";
import { useLoading } from "../../provider/IsLoadingProvider";
import Spinner from "../../components/SpinnerComponent";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";

const EditUserForm = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();
  const [updateUserMutation] = useUpdateUserMutation();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/admin/user/${id}`);
        setUser(response.data);
        setFormData({
          name: response.data.name,
          number: response.data.number,
          email: response.data.email,
          image: response.data.image,
        });
        setImagePreview(response.data.image);
      } catch (error) {
        navigate("/admin");
        toast.error("User Not Found");
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 10 * 1024 * 1024;

    if (file) {
      if (file.size > maxSize) {
        toast.error("File size too large. Maximum size is 10 MB");
        setFormData({ ...formData, image: "" });
        setImagePreview("");
        return;
      }

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setFormData({
            ...formData,
            image: file,
          });
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Profile image must be a valid image");
        setFormData({ ...formData, image: "" });
        setImagePreview("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name, number, image } = formData;

    if (name.trim() === "") {
      toast.error("Name cannot be empty");
    } else if (number.length < 10) {
      toast.error("Phone number should be at least 10 characters");
    } else if (!isValidEmail(email)) {
      toast.error("Email format is incorrect");
    } else {
      try {
        let imageUrl = image;

        if (image && typeof image !== "string") {
          imageUrl = await uploadImageToCloudinary(image, setLoading);
        }

        const updateFormData = {
          name,
          number,
          email,
          image: imageUrl,
          id
        };
        await updateUserMutation(updateFormData).unwrap();
        navigate("/admin");
        toast.success("User updated successfully");
      } catch (error) {
        toast.error("Error updating user ");
        console.log(error);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

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
        <Form.Group className="my-2">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control type="file" id="image" onChange={handleImageChange} />
        </Form.Group>
        <br />
        {imagePreview && (
          <Col xs={4} md={3}>
            <Image
              src={imagePreview}
              roundedCircle
              style={{ width: "100px", height: "100px" }}
            />
          </Col>
        )}
        <br />
        <br />
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
