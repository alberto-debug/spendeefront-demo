import { Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Heading, TableContainer, useMediaQuery } from "@chakra-ui/react";
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
  const [isMobile] = useMediaQuery("(max-width: 768px)");

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
    <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md" maxW="container.md" mx="auto">
      <Heading mb={6} color="teal.500" fontSize={isMobile ? "2xl" : "3xl"}>
        Admin Dashboard
      </Heading>
      <TableContainer>
        <Table variant="striped" colorScheme="teal" size={isMobile ? "sm" : "md"}>
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
      </TableContainer>
      <Button mt={4} colorScheme="red" size={isMobile ? "xs" : "sm"} onClick={() => navigate("/admin/login")}>
        Logout
      </Button>
    </Box>
  );
};

export default AdminDashboard;
