import { Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Heading, TableContainer, useMediaQuery, Link } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const UserTransactions = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
      const fetchUserTransactions = async () => {
        try {
          const response = await axios.get<Transaction[]>(`http://localhost:8080/admin/users/${email}/transactions`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
            },
          });
          setTransactions(response.data);
          setSelectedUser(users.find(user => user.email === email) || null);
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        }
      };

      fetchUserTransactions();
    } else {
      fetchUsers();
    }
  }, [email, users]);

  const handleUserClick = (email: string) => {
    navigate(`/admin/transactions/${email}`);
  };

  return (
    <Box p={4} bg="gray.100" borderRadius="md" boxShadow="md" maxW="container.md" mx="auto">
      <Heading mb={6} color="teal.500" fontSize={isMobile ? "2xl" : "3xl"}>
        User Transactions
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
        </TableContainer>
      )}
      <Button mt={4} colorScheme="blue" size={isMobile ? "xs" : "sm"} onClick={() => navigate("/admin/dashboard")}>
        Go Back
      </Button>
    </Box>
  );
};

export default UserTransactions;
