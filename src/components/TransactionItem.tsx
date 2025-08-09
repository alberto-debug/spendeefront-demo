// components/TransactionItem.tsx
import { Box, Flex, Text, Icon, IconButton } from "@chakra-ui/react";
import { FaUpload, FaDownload } from "react-icons/fa";
import { DeleteIcon } from "@chakra-ui/icons";
import { format } from "date-fns";

interface Transaction {
  id: number;
  amount: string;
  type: string;
  date: string;
  description: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  showDeleteButton?: boolean;
  onDelete?: (id: number) => void;
}

const TransactionItem = ({
  transaction,
  showDeleteButton = false,
  onDelete,
}: TransactionItemProps) => {
  const isIncome = transaction.type === "INCOME";
  const primaryColor = isIncome ? "#10B981" : "#F43F5E";

  return (
    <Box
      position="relative"
      borderRadius="lg"
      bg="#1E293B"
      border="1px solid"
      borderColor="#334155"
      transition="all 0.2s"
      _hover={{
        borderColor: primaryColor,
        transform: "translateY(-2px)",
        boxShadow: `0 4px 12px ${primaryColor}26`,
      }}
      overflow="hidden"
    >
      {/* Colored accent line on the left */}
      <Box
        position="absolute"
        left={0}
        top={0}
        bottom={0}
        width="4px"
        bg={primaryColor}
      />

      <Flex p={4} pl={6} justify="space-between" align="center">
        <Flex align="center" flex={1}>
          <Box
            bg={`${primaryColor}1A`}
            p={2}
            borderRadius="md"
            mr={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon
              as={isIncome ? FaDownload : FaUpload}
              color={primaryColor}
              boxSize={4}
            />
          </Box>
          <Box>
            <Text fontWeight="600" fontSize="md" color="white" mb={1}>
              {transaction.description}
            </Text>
            <Text fontSize="xs" color="#94A3B8">
              {format(new Date(transaction.date), "MMM dd, yyyy")}
            </Text>
          </Box>
        </Flex>
        <Flex align="center" gap={4}>
          <Box textAlign="right">
            <Text fontWeight="bold" fontSize="lg" color={primaryColor}>
              {isIncome ? "+" : "-"}${transaction.amount}
            </Text>
            <Text
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="full"
              bg={`${primaryColor}1A`}
              color={primaryColor}
              display="inline-block"
            >
              {transaction.type}
            </Text>
          </Box>
          {showDeleteButton && onDelete && (
            <IconButton
              aria-label="Delete transaction"
              icon={<DeleteIcon />}
              variant="ghost"
              color="#94A3B8"
              _hover={{
                bg: "rgba(244, 63, 94, 0.15)",
                color: "#F43F5E",
              }}
              size="sm"
              onClick={() => onDelete(transaction.id)}
            />
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default TransactionItem;
