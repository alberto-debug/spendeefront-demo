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
  Icon,
  IconButton,
  Flex,
  Grid,
  GridItem,
  Card,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaUser, FaTasks, FaChartLine, FaMoneyBillWave } from "react-icons/fa";

interface UserSummary {
  id: number;
  name: string;
  email: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const bg = "#1a202c";
  const color = "white";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserSummary[]>(
          "http://localhost:8080/admin/users",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("auth-token")}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box bg={bg} minH="100vh" w="100vw" color={color}>
      <Box p={4}>
        <Box p={4} bg={bg} mb={6}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading fontSize={isMobile ? "2xl" : "4xl"}>
              Admin Dashboard
            </Heading>
            <IconButton
              aria-label="Logout"
              icon={<FiLogOut />}
              colorScheme="whiteAlpha"
              size={isMobile ? "xs" : "sm"}
              onClick={() => navigate("/admin/login")}
            />
          </Flex>
        </Box>

        <Grid templateColumns={isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)"} gap={4} mb={6}>
          <GridItem>
            <Card bg="gray.900" color={color} boxShadow="lg" p={4} borderRadius="lg">
              <CardHeader>
                <Flex justifyContent="space-between" alignItems="center">
                  <Stat>
                    <StatLabel>Users</StatLabel>
                    <StatNumber>{users.length}</StatNumber>
                    <StatHelpText>Number of registered users</StatHelpText>
                  </Stat>
                  <Icon as={FaUser} boxSize={6} color="blue.500" />
                </Flex>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem>
            <Card bg="gray.900" color={color} boxShadow="lg" p={4} borderRadius="lg">
              <CardHeader>
                <Flex justifyContent="space-between" alignItems="center">
                  <Stat>
                    <StatLabel>Tasks</StatLabel>
                    <StatNumber>120</StatNumber>
                    <StatArrow type="increase" />
                    <StatHelpText>Total number of tasks assigned</StatHelpText>
                  </Stat>
                  <Icon as={FaTasks} boxSize={6} color="teal.500" />
                </Flex>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem>
            <Card bg="gray.900" color={color} boxShadow="lg" p={4} borderRadius="lg">
              <CardHeader>
                <Flex justifyContent="space-between" alignItems="center">
                  <Stat>
                    <StatLabel>Transactions</StatLabel>
                    <StatNumber>$5,000</StatNumber>
                    <StatArrow type="increase" />
                    <StatHelpText>Total transactions processed</StatHelpText>
                  </Stat>
                  <Icon as={FaChartLine} boxSize={6} color="blue.500" />
                </Flex>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem>
            <Card bg="gray.900" color={color} boxShadow="lg" p={4} borderRadius="lg">
              <CardHeader>
                <Flex justifyContent="space-between" alignItems="center">
                  <Stat>
                    <StatLabel>Revenue</StatLabel>
                    <StatNumber>$10,000</StatNumber>
                    <StatArrow type="increase" />
                    <StatHelpText>Total revenue generated</StatHelpText>
                  </Stat>
                  <Icon as={FaMoneyBillWave} boxSize={6} color="teal.500" />
                </Flex>
              </CardHeader>
            </Card>
          </GridItem>
        </Grid>

        <Flex justifyContent="center" mb={6}>
          <Button
            onClick={() => navigate("/admin/transactions")}
            bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            color="white"
            _hover={{
              bg: "linear-gradient(135deg, #5a6cd8 0%, #6a3e92 100%)",
            }}
            _active={{
              bg: "linear-gradient(135deg, #4e5ec6 0%, #5e3482 100%)",
            }}
            size={isMobile ? "sm" : "md"}
            mr={4}
            boxShadow="md"
          >
            User Transactions
          </Button>
          <Button
            onClick={() => navigate("/admin/tasks")}
            bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            color="white"
            _hover={{
              bg: "linear-gradient(135deg, #5a6cd8 0%, #6a3e92 100%)",
            }}
            _active={{
              bg: "linear-gradient(135deg, #4e5ec6 0%, #5e3482 100%)",
            }}
            size={isMobile ? "sm" : "md"}
            boxShadow="md"
          >
            User Tasks
          </Button>
        </Flex>

        <TableContainer
          overflowY="auto"
          maxH="400px"
          bg="gray.900"
          borderRadius="lg"
          p={4}
        >
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
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
