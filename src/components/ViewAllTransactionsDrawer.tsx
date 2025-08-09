// components/ViewAllTransactionsDrawer.tsx
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Container,
  Heading,
  Flex,
  Box,
  Text,
  Input,
  Select,
  Icon,
  VStack,
  Button,
} from "@chakra-ui/react";
import { FaDownload, FaCalendarAlt } from "react-icons/fa";
import TransactionItem from "./TransactionItem";

interface Transaction {
  id: number;
  amount: string;
  type: string;
  date: string;
  description: string;
}

interface ViewAllTransactionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  filterDate: string | null;
  filterType: string | null;
  onFilterDateChange: (date: string | null) => void;
  onFilterTypeChange: (type: string | null) => void;
  onDeleteTransaction: (id: number) => void;
}

const ViewAllTransactionsDrawer = ({
  isOpen,
  onClose,
  transactions,
  filterDate,
  filterType,
  onFilterDateChange,
  onFilterTypeChange,
  onDeleteTransaction,
}: ViewAllTransactionsDrawerProps) => {
  const filteredTransactions = transactions.filter((transaction) => {
    const dateMatches =
      !filterDate ||
      new Date(transaction.date).toDateString() ===
        new Date(filterDate).toDateString();
    const typeMatches = !filterType || transaction.type === filterType;
    return dateMatches && typeMatches;
  });

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent
        bg="#111827"
        maxH="80vh"
        mx="auto"
        mt="auto"
        borderTopRadius="20px"
        w={{ base: "100%", md: "75%", lg: "65%" }}
        boxShadow="0 -10px 30px rgba(0, 0, 0, 0.3)"
        borderTop="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        <DrawerCloseButton color="white" />
        <DrawerHeader borderBottomWidth="1px" borderColor="#1E293B">
          <Container maxW="container.lg">
            <Heading size="lg" color="white">
              All Transactions
            </Heading>
          </Container>
        </DrawerHeader>
        <DrawerBody>
          <Container maxW="container.lg">
            <Flex mb={6} flexDirection={{ base: "column", md: "row" }} gap={4}>
              <Box flex="1">
                <Text color="white" mb={2} fontWeight="medium">
                  Filter by Date:
                </Text>
                <Input
                  type="date"
                  value={filterDate || ""}
                  onChange={(e) => onFilterDateChange(e.target.value || null)}
                  borderColor="#1E293B"
                  _hover={{ borderColor: "#334155" }}
                  _focus={{
                    borderColor: "#0EA5E9",
                    boxShadow: "0 0 0 1px #0EA5E9",
                  }}
                  color="white"
                  bg="#0F172A"
                />
              </Box>
              <Box flex="1">
                <Text color="white" mb={2} fontWeight="medium">
                  Filter by Type:
                </Text>
                <Select
                  value={filterType || ""}
                  onChange={(e) => onFilterTypeChange(e.target.value || null)}
                  borderColor="#1E293B"
                  _hover={{ borderColor: "#334155" }}
                  _focus={{
                    borderColor: "#0EA5E9",
                    boxShadow: "0 0 0 1px #0EA5E9",
                  }}
                  color="white"
                  bg="#0F172A"
                  icon={<Icon as={FaDownload} />}
                >
                  <option value="" style={{ background: "#0F172A" }}>
                    All
                  </option>
                  <option value="INCOME" style={{ background: "#0F172A" }}>
                    Income
                  </option>
                  <option value="EXPENSE" style={{ background: "#0F172A" }}>
                    Expense
                  </option>
                </Select>
              </Box>
            </Flex>

            {filteredTransactions.length === 0 ? (
              <Flex
                direction="column"
                align="center"
                justify="center"
                py={10}
                px={4}
                textAlign="center"
                color="#94A3B8"
                bg="#0F172A"
                borderRadius="xl"
                border="1px dashed #334155"
              >
                <Icon as={FaCalendarAlt} boxSize={10} mb={4} opacity={0.6} />
                <Text fontSize="lg" fontWeight="medium" mb={2}>
                  No transactions found
                </Text>
                <Text fontSize="sm">Try changing your filters</Text>
              </Flex>
            ) : (
              <VStack spacing={3} align="stretch">
                {filteredTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    showDeleteButton={true}
                    onDelete={onDeleteTransaction}
                  />
                ))}
              </VStack>
            )}
          </Container>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px" borderColor="#1E293B">
          <Container maxW="container.lg">
            <Flex justify="flex-end">
              <Button
                bg="#0EA5E9"
                color="white"
                _hover={{
                  bg: "#0284C7",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(14, 165, 233, 0.4)",
                }}
                _active={{ bg: "#0369A1" }}
                onClick={onClose}
                transition="all 0.2s"
                borderRadius="full"
              >
                Close
              </Button>
            </Flex>
          </Container>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ViewAllTransactionsDrawer;
