
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
  Card,
  CardHeader,
  Collapse,
  Stat,
  StatHelpText,
  StatNumber,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {
  FaUser,
  FaTasks,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa";

interface UserSummary {
  id: number;
  name: string;
  email: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [expandedCards, setExpandedCards] = useState<boolean[]>(
    Array(4).fill(false)
  );

  const bg = "#1a202c"; // dark background
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

  const cardData = [
    {
      label: "Users",
      number: users.length,
      helpText: "Registered users",
      icon: FaUser,
      bg: "linear-gradient(135deg, #ff416c, #ff4b2b)",
      iconColor: "yellow.200",
    },
    {
      label: "Tasks",
      number: 120,
      helpText: "Assigned tasks",
      icon: FaTasks,
      bg: "linear-gradient(135deg, #56ab2f, #a8e063)",
      iconColor: "white",
    },
    {
      label: "Transactions",
      number: "$5,000",
      helpText: "Processed",
      icon: FaChartLine,
      bg: "linear-gradient(135deg, #614385, #516395)",
      iconColor: "cyan.200",
    },
    {
      label: "Revenue",
      number: "$10,000",
      helpText: "Generated",
      icon: FaMoneyBillWave,
      bg: "linear-gradient(135deg, #f7971e, #ffd200)",
      iconColor: "green.900",
    },
  ];

  const toggleCard = (index: number) => {
    const newExpanded = [...expandedCards];
    newExpanded[index] = !newExpanded[index];
    setExpandedCards(newExpanded);
  };

  return (
    <Box bg={bg} minH="100vh" w="100vw" color={color}>
      <Box p={4}>
        {/* UPDATED NAVBAR COLOR */}
        <Box
          p={4}
          bg="linear-gradient(to right, #667eea, #764ba2)"
          color="white"
          borderRadius="md"
          mb={6}
        >
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

        <Flex justifyContent="center" mb={20}>
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={8}
            maxW="780px"
            w="100%"
          >
            {cardData.map((card, idx) => (
              <Card
                key={idx}
                bg={card.bg}
                color={color}
                p={3}
                borderRadius="md"
                boxShadow="lg"
                cursor="pointer"
                maxW="320px"
                w="100%"
                onClick={() => toggleCard(idx)}
                transition="all 0.2s"
                _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
              >
                <CardHeader p={2}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="md" fontWeight="bold">
                      {card.label}
                    </Text>
                    <Icon as={card.icon} boxSize={5} color={card.iconColor} />
                  </Flex>
                </CardHeader>
                <Collapse in={expandedCards[idx]} animateOpacity>
                  <Box mt={2} p={1}>
                    <Stat>
                      <StatNumber fontSize="xl">{card.number}</StatNumber>
                      <StatHelpText fontSize="sm">{card.helpText}</StatHelpText>
                    </Stat>
                  </Box>
                </Collapse>
              </Card>
            ))}
          </Grid>
        </Flex>

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
          bg="gray.800"
          borderRadius="md"
          p={4}
          boxShadow="md"
        >
          <Table variant="simple" size={isMobile ? "sm" : "md"}>
            <Thead bg="gray.700">
              <Tr>
                <Th color="white">ID</Th>
                <Th color="white">Name</Th>
                <Th color="white">Email</Th>
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
