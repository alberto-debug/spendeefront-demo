import { Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Heading, TableContainer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, useMediaQuery } from "@chakra-ui/react";
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

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);
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
      setSelectedUser(users.find(user => user.email === email) || null);
      onOpen();
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

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
              <Tr key={user.id} onClick={() => fetchUserTransactions(user.email)} cursor="pointer">
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
          <ModalHeader>User Transactions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser && (
              <Box>
                <Heading size="md" mb={4}>{selectedUser.name}'s Transactions</Heading>
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
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;
