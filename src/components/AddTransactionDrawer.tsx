// components/AddTransactionDrawer.tsx
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
  VStack,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

interface Transaction {
  amount: string;
  type: string;
  date: string;
  description: string;
}

interface AddTransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  type: "INCOME" | "EXPENSE";
  transaction: Transaction;
  onTransactionChange: (transaction: Transaction) => void;
  onAddTransaction: () => void;
  isLoading: boolean;
}

const AddTransactionDrawer = ({
  isOpen,
  onClose,
  type,
  transaction,
  onTransactionChange,
  onAddTransaction,
  isLoading,
}: AddTransactionDrawerProps) => {
  const isIncome = type === "INCOME";
  const title = isIncome ? "Add Income" : "Add Expense";
  const buttonText = isIncome ? "Add Income" : "Add Expense";
  const primaryColor = isIncome ? "#10B981" : "#F43F5E";
  const hoverColor = isIncome ? "#0D9488" : "#E11D48";
  const activeColor = isIncome ? "#0F766E" : "#BE123C";

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
              {title}
            </Heading>
          </Container>
        </DrawerHeader>
        <DrawerBody>
          <Container maxW="container.lg">
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Amount"
                type="number"
                value={transaction.amount}
                onChange={(e) =>
                  onTransactionChange({
                    ...transaction,
                    amount: e.target.value,
                    type: type,
                  })
                }
                borderColor={primaryColor}
                _hover={{ borderColor: hoverColor }}
                _focus={{
                  borderColor: activeColor,
                  boxShadow: `0 0 0 1px ${activeColor}`,
                }}
                color="white"
                fontSize={["sm", "md", "lg"]}
              />
              <Input
                type="date"
                value={transaction.date}
                onChange={(e) =>
                  onTransactionChange({
                    ...transaction,
                    date: e.target.value,
                  })
                }
                borderColor="#8B5CF6"
                _hover={{ borderColor: "#7C3AED" }}
                _focus={{
                  borderColor: "#6D28D9",
                  boxShadow: "0 0 0 1px #6D28D9",
                }}
                color="white"
                fontSize={["sm", "md", "lg"]}
              />
              <Input
                placeholder="Description"
                value={transaction.description}
                onChange={(e) =>
                  onTransactionChange({
                    ...transaction,
                    description: e.target.value,
                  })
                }
                borderColor="#0EA5E9"
                _hover={{ borderColor: "#0284C7" }}
                _focus={{
                  borderColor: "#0369A1",
                  boxShadow: "0 0 0 1px #0369A1",
                }}
                color="white"
                fontSize={["sm", "md", "lg"]}
              />
            </VStack>
          </Container>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px" borderColor="#1E293B">
          <Container maxW="container.lg">
            <Flex justify="flex-end">
              <Button
                bg={primaryColor}
                color="white"
                borderRadius="full"
                _hover={{
                  bg: hoverColor,
                  transform: "translateY(-2px)",
                  boxShadow: `0 4px 12px ${primaryColor}66`,
                }}
                _active={{ bg: activeColor }}
                onClick={onAddTransaction}
                isLoading={isLoading}
                size="lg"
                transition="all 0.2s"
              >
                {buttonText}
              </Button>
            </Flex>
          </Container>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddTransactionDrawer;
