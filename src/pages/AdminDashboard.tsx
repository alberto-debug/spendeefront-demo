// src/pages/AdminDashboard.tsx
import { Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserSummary {
  id: number;
  name: string;
  email: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserSummary[]>("http://localhost:8080/admin/users", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box p={4}>
      <Heading mb={6}>Admin Dashboard</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button mt={4} onClick={() => navigate("/admin/login")}>
        Logout
      </Button>
    </Box>
  );
};

export default AdminDashboard;
