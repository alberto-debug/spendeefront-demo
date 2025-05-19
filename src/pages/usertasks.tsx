import {
  Box,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  TableContainer,
  useMediaQuery,
  Link,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

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
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const navbarBg = useColorModeValue("blue.500", "blue.900");
  const navbarColor = useColorModeValue("white", "gray.200");

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

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Box p={4} bg={bg} borderRadius="md" boxShadow="md" maxW="container.md" mx="auto">
      <Box bg={navbarBg} color={navbarColor} p={4} borderRadius="md" mb={6}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading fontSize={isMobile ? "2xl" : "3xl"}>
            User Tasks
          </Heading>
          <IconButton
            aria-label="Go Back"
            icon={<FiArrowLeft />}
            colorScheme="whiteAlpha"
            size={isMobile ? "xs" : "sm"}
            onClick={handleGoBack}
          />
        </HStack>
      </Box>
      {!selectedUser ? (
        <TableContainer>
          <Table variant="striped" colorScheme="blue" size={isMobile ? "sm" : "md"}>
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
          <Table variant="striped" colorScheme="blue" size={isMobile ? "sm" : "md"}>
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
    </Box>
  );
};

export default UserTasks;
