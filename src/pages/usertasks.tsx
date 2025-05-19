import { Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Heading, TableContainer, useMediaQuery, Link } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface UserSummary {
  id: number;
  name: string;
  email: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

const UserTasks = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { email } = useParams();

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

    if (email) {
      const fetchUserTasks = async () => {
        try {
          const response = await axios.get<Task[]>(`http://localhost:8080/admin/users/${email}/tasks`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
            },
          });
          setTasks(response.data);
          setSelectedUser(users.find(user => user.email === email) || null);
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
      };

      fetchUserTasks();
    } else {
      fetchUsers();
    }
  }, [email, users]);

  const handleUserClick = (email: string) => {
    navigate(`/admin/tasks/${email}`);
  };

  return (
    <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md" maxW="container.md" mx="auto">
      <Heading mb={6} color="teal.500" fontSize={isMobile ? "2xl" : "3xl"}>
        User Tasks
      </Heading>
      {!selectedUser ? (
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
                <Tr key={user.id} onClick={() => handleUserClick(user.email)} cursor="pointer">
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="teal" size={isMobile ? "sm" : "md"}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Due Date</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks.map((task) => (
                <Tr key={task.id}>
                  <Td>{task.id}</Td>
                  <Td>{task.title}</Td>
                  <Td>{task.dueDate}</Td>
                  <Td>{task.description}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <Button mt={4} colorScheme="blue" size={isMobile ? "xs" : "sm"} onClick={() => navigate("/admin/dashboard")}>
        Go Back
      </Button>
    </Box>
  );
};

export default UserTasks;
