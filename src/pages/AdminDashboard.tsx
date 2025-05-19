import { Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Heading, TableContainer } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserSummary {
  id: number;
  name: string;
  email: string;
  role: string; // Added a new field for demonstration
  status: string; // Added a new field for demonstration
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
    <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md">
      <Heading mb={6} color="teal.500">
        Admin Dashboard
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th> {/* New column */}
              <Th>Status</Th> {/* New column */}
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td> {/* New field */}
                <Td>{user.status}</Td> {/* New field */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button mt={4} colorScheme="red" onClick={() => navigate("/admin/login")}>
        Logout
      </Button>
    </Box>
  );
};

export default AdminDashboard;
