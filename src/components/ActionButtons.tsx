// components/ActionButtons.tsx
import { Button, Flex, Icon } from "@chakra-ui/react";
import { FaUpload, FaDownload } from "react-icons/fa";
import DownloadPdfButton from "./DownloadPdfButton";
import TaskManagerWithButton from "../pages/TaskManager";

interface ActionButtonsProps {
  onIncomeClick: () => void;
  onExpenseClick: () => void;
  transactions: any[];
  balance: number;
}

const ActionButtons = ({
  onIncomeClick,
  onExpenseClick,
  transactions,
  balance,
}: ActionButtonsProps) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mb={6}
      mx="auto"
      maxW={{ base: "100%", md: "90%" }}
      px={{ base: 4, md: 6 }}
      gap={1}
      flexWrap="wrap"
    >
      <Button
        bg="linear-gradient(135deg, #34d399 0%, #059669 100%)"
        color="white"
        borderRadius="12px"
        boxShadow="0 4px 15px rgba(52, 211, 153, 0.3)"
        _hover={{
          bg: "linear-gradient(135deg, #2cc084 0%, #048554 100%)",
          transform: "translateY(-2px)",
        }}
        _active={{
          bg: "linear-gradient(135deg, #23a670 0%, #03704a 100%)",
        }}
        onClick={onIncomeClick}
        leftIcon={
          <Icon
            as={FaDownload}
            color="white"
            boxSize={{ base: "16px", md: "20px", lg: "24px" }}
          />
        }
        size="lg"
        height={{ base: "60px", md: "75px", lg: "90px" }}
        width={{ base: "100px", md: "115px", lg: "130px" }}
        fontSize={{ base: "12px", md: "14px", lg: "16px" }}
        transition="all 0.3s ease"
      >
        Income
      </Button>

      <Button
        bg="linear-gradient(135deg, #ff7171 0%, #e02e2e 100%)"
        color="white"
        borderRadius="12px"
        boxShadow="0 4px 15px rgba(255, 113, 113, 0.3)"
        _hover={{
          bg: "linear-gradient(135deg, #e05a5a 0%, #c02424 100%)",
          transform: "translateY(-2px)",
        }}
        _active={{
          bg: "linear-gradient(135deg, #d04a4a 0%, #a01e1e 100%)",
        }}
        onClick={onExpenseClick}
        leftIcon={
          <Icon
            as={FaUpload}
            color="white"
            boxSize={{ base: "16px", md: "20px", lg: "24px" }}
          />
        }
        size="lg"
        height={{ base: "60px", md: "75px", lg: "90px" }}
        width={{ base: "100px", md: "115px", lg: "130px" }}
        fontSize={{ base: "12px", md: "14px", lg: "16px" }}
        transition="all 0.3s ease"
      >
        Outcome
      </Button>

      <Flex justifyContent="space-between" width="100%" gap={1} flexWrap="wrap">
        <DownloadPdfButton transactions={transactions} balance={balance} />
        <TaskManagerWithButton />
      </Flex>
    </Flex>
  );
};

export default ActionButtons;
