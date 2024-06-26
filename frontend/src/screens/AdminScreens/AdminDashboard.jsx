import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Navbar,
  Container,
  FormControl,
  Image,
} from "react-bootstrap";
import Spinner from "../../components/SpinnerComponent";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        setLoading(false);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredUsersList = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filteredUsersList);
  }, [users, search]);

  const handleEditUser = (userId) => {
    navigate(`/admin/edit/${userId}`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Navbar
        bg="white"
        variant="dark"
        expand="lg"
        collapseOnSelect
        style={{ height: "50px" }}
      >
        <Container>
          <FormControl
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
          />
        </Container>
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.number}</td>
              <td>{user.email}</td>
              <td>
                <Image
                  src={user.image}
                  roundedCircle
                  width="30"
                  height="30"
                  alt="Profile"
                  className="me-2"
                />
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEditUser(user._id)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
