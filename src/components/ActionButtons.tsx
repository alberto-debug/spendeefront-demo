// components/ActionButtons.tsx
import { Button, Flex, Icon, Box } from "@chakra-ui/react";
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
    <>
      {/* Desktop Layout - Mantém posição atual */}
      <Flex
        display={{ base: "none", md: "flex" }}
        justifyContent="space-between"
        alignItems="center"
        mb={6}
        mx="auto"
        maxW="90%"
        px={6}
        gap={4}
        flexWrap="wrap"
      >
        <Button
          bg="linear-gradient(135deg, #34d399 0%, #059669 100%)"
          color="white"
          borderRadius="16px"
          boxShadow="0 8px 25px rgba(52, 211, 153, 0.25)"
          _hover={{
            bg: "linear-gradient(135deg, #2cc084 0%, #048554 100%)",
            transform: "translateY(-3px)",
            boxShadow: "0 12px 35px rgba(52, 211, 153, 0.35)",
          }}
          _active={{
            bg: "linear-gradient(135deg, #23a670 0%, #03704a 100%)",
            transform: "translateY(-1px)",
          }}
          onClick={onIncomeClick}
          leftIcon={<Icon as={FaDownload} color="white" boxSize="24px" />}
          size="lg"
          height="90px"
          width="130px"
          fontSize="16px"
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          fontWeight="600"
        >
          Income
        </Button>

        <Button
          bg="linear-gradient(135deg, #ff7171 0%, #e02e2e 100%)"
          color="white"
          borderRadius="16px"
          boxShadow="0 8px 25px rgba(255, 113, 113, 0.25)"
          _hover={{
            bg: "linear-gradient(135deg, #e05a5a 0%, #c02424 100%)",
            transform: "translateY(-3px)",
            boxShadow: "0 12px 35px rgba(255, 113, 113, 0.35)",
          }}
          _active={{
            bg: "linear-gradient(135deg, #d04a4a 0%, #a01e1e 100%)",
            transform: "translateY(-1px)",
          }}
          onClick={onExpenseClick}
          leftIcon={<Icon as={FaUpload} color="white" boxSize="24px" />}
          size="lg"
          height="90px"
          width="130px"
          fontSize="16px"
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          fontWeight="600"
        >
          Outcome
        </Button>

        <Flex
          justifyContent="space-between"
          width="100%"
          gap={4}
          flexWrap="wrap"
          mt={4}
        >
          <DownloadPdfButton transactions={transactions} balance={balance} />
          <TaskManagerWithButton />
        </Flex>
      </Flex>

      {/* Mobile Layout - Botões fixos na parte inferior */}
      <Box display={{ base: "block", md: "none" }}>
        {/* Container fixo na parte inferior - Com fundo preto e altura reduzida */}
        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          zIndex={1000}
          bg="rgba(0, 0, 0, 0.95)" // Fundo preto
          backdropFilter="blur(20px)"
          borderTopRadius="20px"
          boxShadow="0 -2px 20px rgba(0, 0, 0, 0.3)"
          px={4}
          py={2} // Reduzido de 3 para 2
          borderTop="1px solid"
          borderColor="rgba(255, 255, 255, 0.1)" // Borda mais clara para contrastar com o preto
        >
          {/* Navigation Bar - Estilo Apps Modernos com altura reduzida */}
          <Flex justifyContent="space-around" alignItems="center" px={2} py={1}>
            {/* Income Button - Mesmo tamanho dos outros */}
            <Flex flexDirection="column" alignItems="center" gap={1}>
              <Box
                as="button"
                onClick={onIncomeClick}
                bg="linear-gradient(135deg, #34d399 0%, #059669 100%)"
                borderRadius="full"
                p={3} // Reduzido de 4 para 3 para igualar aos outros botões
                boxShadow="0 4px 15px rgba(52, 211, 153, 0.3)"
                _hover={{
                  transform: "scale(1.1)",
                  boxShadow: "0 6px 20px rgba(52, 211, 153, 0.4)",
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
                transition="all 0.2s ease"
                cursor="pointer"
                width="48px" // Mesmo tamanho dos outros botões
                height="48px" // Mesmo tamanho dos outros botões
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FaDownload} color="white" boxSize="20px" />
              </Box>
              <Box
                fontSize="10px"
                color="gray.300" // Mais claro para contrastar com o fundo preto
                fontWeight="500"
                textAlign="center"
              >
                Income
              </Box>
            </Flex>

            {/* Expense Button - Mesmo tamanho dos outros */}
            <Flex flexDirection="column" alignItems="center" gap={1}>
              <Box
                as="button"
                onClick={onExpenseClick}
                bg="linear-gradient(135deg, #ff7171 0%, #e02e2e 100%)"
                borderRadius="full"
                p={3} // Reduzido de 4 para 3 para igualar aos outros botões
                boxShadow="0 4px 15px rgba(255, 113, 113, 0.3)"
                _hover={{
                  transform: "scale(1.1)",
                  boxShadow: "0 6px 20px rgba(255, 113, 113, 0.4)",
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
                transition="all 0.2s ease"
                cursor="pointer"
                width="48px" // Mesmo tamanho dos outros botões
                height="48px" // Mesmo tamanho dos outros botões
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FaUpload} color="white" boxSize="20px" />
              </Box>
              <Box
                fontSize="10px"
                color="gray.300" // Mais claro para contrastar com o fundo preto
                fontWeight="500"
                textAlign="center"
              >
                Outcome
              </Box>
            </Flex>

            {/* Download PDF Button */}
            <DownloadPdfButton transactions={transactions} balance={balance} />

            {/* Task Manager Button */}
            <TaskManagerWithButton />
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default ActionButtons;
