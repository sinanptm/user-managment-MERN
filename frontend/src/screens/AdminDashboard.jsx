import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Spinner from "../components/SpinnerComponent";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        setLoading(false);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (userId) => {
    navigate(`/admin/edit/${userId}`)
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
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
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.number}</td>
              <td>{user.email}</td>
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
