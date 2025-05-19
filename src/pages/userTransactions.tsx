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

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Box p={4} bg={bg} borderRadius="md" boxShadow="md" maxW="container.md" mx="auto">
      <Box bg={navbarBg} color={navbarColor} p={4} borderRadius="md" mb={6}>
        <HStack justifyContent="space-between" alignItems="center">
          <Heading fontSize={isMobile ? "2xl" : "3xl"}>
            User Transactions
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
    </Box>
  );
};

export default UserTransactions;
