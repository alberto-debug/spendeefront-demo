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
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaUser, FaTasks, FaChartLine } from "react-icons/fa";

interface UserSummary {
  id: number;
  name: string;
  email: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");

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
    <Box p={4} bg={bg} borderRadius="md" boxShadow="md" maxW="container.md" mx="auto">
      <Heading mb={6} color={color} fontSize={isMobile ? "2xl" : "3xl"}>
        Admin Dashboard
      </Heading>
      <Grid templateColumns={isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)"} gap={6} mb={6}>
        <GridItem>
          <Card bg={bg} color={color}>
            <CardHeader>
              <Flex justifyContent="space-between" alignItems="center">
                <Stat>
                  <StatLabel>Users</StatLabel>
                  <StatNumber>{users.length}</StatNumber>
                </Stat>
                <Icon as={FaUser} boxSize={6} color="teal.500" />
              </Flex>
            </CardHeader>
            <CardBody>
              <StatHelpText>Number of registered users</StatHelpText>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card bg={bg} color={color}>
            <CardHeader>
              <Flex justifyContent="space-between" alignItems="center">
                <Stat>
                  <StatLabel>Tasks</StatLabel>
                  <StatNumber>120</StatNumber>
                  <StatArrow type="increase" />
                </Stat>
                <Icon as={FaTasks} boxSize={6} color="teal.500" />
              </Flex>
            </CardHeader>
            <CardBody>
              <StatHelpText>Total number of tasks assigned</StatHelpText>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card bg={bg} color={color}>
            <CardHeader>
              <Flex justifyContent="space-between" alignItems="center">
                <Stat>
                  <StatLabel>Transactions</StatLabel>
                  <StatNumber>$5,000</StatNumber>
                  <StatArrow type="increase" />
                </Stat>
                <Icon as={FaChartLine} boxSize={6} color="teal.500" />
              </Flex>
            </CardHeader>
            <CardBody>
              <StatHelpText>Total transactions processed</StatHelpText>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      <Button onClick={() => navigate("/admin/transactions")} colorScheme="teal" size={isMobile ? "sm" : "md"} mb={4}>
        User Transactions
      </Button>
      <Button onClick={() => navigate("/admin/tasks")} colorScheme="teal" size={isMobile ? "sm" : "md"} mb={4}>
        User Tasks
      </Button>
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
      <Flex justifyContent="flex-end" mt={4}>
        <IconButton
          aria-label="Logout"
          icon={<FiLogOut />}
          colorScheme="red"
          size={isMobile ? "xs" : "sm"}
          onClick={() => navigate("/admin/login")}
        />
      </Flex>
    </Box>
  );
};

export default AdminDashboard;
