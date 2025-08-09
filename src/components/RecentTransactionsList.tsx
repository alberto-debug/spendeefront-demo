// components/RecentTransactionsList.tsx
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import TransactionItem from "./TransactionItem";

interface Transaction {
  id: number;
  amount: string;
  type: string;
  date: string;
  description: string;
}

interface RecentTransactionsListProps {
  transactions: Transaction[];
  onViewAllClick: () => void;
}

const RecentTransactionsList = ({
  transactions,
  onViewAllClick,
}: RecentTransactionsListProps) => {
  const displayedTransactions = transactions.slice(0, 8);
  const hasMoreTransactions = transactions.length > 8;

  return (
    <Box
      mt={8}
      w={{ base: "100%", md: "90%" }} // largura maior
      mx="auto" // centraliza
      bg="#0F172A"
      borderRadius="xl"
      overflow="hidden"
      border="1px solid"
      borderColor="#1E293B"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)"
    >
      <Flex
        justify="space-between"
        align="center"
        bg="#1E293B"
        p={4}
        borderBottom="1px solid"
        borderColor="#334155"
      >
        <Heading size="md" color="white" fontWeight="600">
          Recent Transactions
        </Heading>
        <Button
          bg="linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
          color="white"
          borderRadius="full"
          size="sm"
          px={4}
          py={2}
          fontSize="xs"
          fontWeight="medium"
          boxShadow="0 2px 10px rgba(0, 198, 255, 0.3)"
          _hover={{
            bg: "linear-gradient(135deg, #00b4e6 0%, #0066e6 100%)",
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(0, 198, 255, 0.4)",
          }}
          _active={{
            bg: "linear-gradient(135deg, #00a3cc 0%, #0059cc 100%)",
          }}
          onClick={onViewAllClick}
          transition="all 0.3s ease"
        >
          View All
        </Button>
      </Flex>

      {transactions.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={10}
          px={4}
          textAlign="center"
          color="#94A3B8"
        >
          <Icon as={FaCalendarAlt} boxSize={10} mb={4} opacity={0.6} />
          <Text fontSize="lg" fontWeight="medium" mb={2}>
            No transactions yet
          </Text>
          <Text fontSize="sm">Add your first transaction to get started</Text>
        </Flex>
      ) : (
        <Box p={4}>
          <VStack spacing={3} align="stretch">
            {displayedTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                showDeleteButton={false}
              />
            ))}

            {hasMoreTransactions && (
              <Flex
                justify="center"
                py={3}
                borderTop="1px dashed"
                borderColor="#334155"
                mt={2}
                onClick={onViewAllClick}
                cursor="pointer"
                _hover={{ bg: "rgba(255, 255, 255, 0.03)" }}
                transition="all 0.2s"
                borderRadius="md"
              >
                <Text color="#94A3B8" fontSize="sm" fontWeight="medium">
                  View {transactions.length - 8} more transactions
                </Text>
              </Flex>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default RecentTransactionsList;
