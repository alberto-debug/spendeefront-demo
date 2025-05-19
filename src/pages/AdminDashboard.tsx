import { Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Heading, TableContainer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, useMediaQuery, VStack, HStack } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserSummary {
  id: number;
  name: string;
  email: string;
}

interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);
  const [selectedCard, setSelectedCard] = useState<'transactions' | 'tasks' | null>(null);
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const fetchUserTransactions = async (email: string) => {
    try {
      const response = await axios.get<Transaction[]>(`http://localhost:8080/admin/users/${email}/transactions`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const fetchUserTasks = async (email: string) => {
    try {
      const response = await axios.get<Task[]>(`http://localhost:8080/admin/users/${email}/tasks`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const handleUserClick = (email: string) => {
    setSelectedUser(users.find(user => user.email === email) || null);
    if (selectedCard === 'transactions') {
      fetchUserTransactions(email);
    } else if (selectedCard === 'tasks') {
      fetchUserTasks(email);
    }
  };

  const handleGoBack = () => {
    setSelectedUser(null);
  };

  return (
    <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md" maxW="container.md" mx="auto">
      <Heading mb={6} color="teal.500" fontSize={isMobile ? "2xl" : "3xl"}>
        Admin Dashboard
      </Heading>
      <HStack spacing={4} mb={6}>
        <Button onClick={() => { setSelectedCard('transactions'); onOpen(); }} colorScheme="teal" size={isMobile ? "sm" : "md"}>
          User Transactions
        </Button>
        <Button onClick={() => { setSelectedCard('tasks'); onOpen(); }} colorScheme="teal" size={isMobile ? "sm" : "md"}>
          User Tasks
        </Button>
      </HStack>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCard === 'transactions' ? 'User Transactions' : 'User Tasks'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!selectedUser ? (
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
            ) : (
              <VStack align="start" w="full">
                <Button onClick={handleGoBack} colorScheme="blue" size={isMobile ? "sm" : "md"}>
                  Go Back
                </Button>
                {selectedCard === 'transactions' ? (
                  <Table variant="striped" colorScheme="teal" size={isMobile ? "sm" : "md"}>
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Amount</Th>
                        <Th>Date</Th>
                        <Th>Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {transactions.map((transaction) => (
                        <Tr key={transaction.id}>
                          <Td>{transaction.id}</Td>
                          <Td>{transaction.amount}</Td>
                          <Td>{transaction.date}</Td>
                          <Td>{transaction.description}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                ) : (
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
                )}
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
