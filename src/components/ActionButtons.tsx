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

      {/* Mobile Layout - Botões fixos otimizados para Android */}
      <Box display={{ base: "block", md: "none" }}>
        {/* Container fixo na parte inferior - Mais compacto e elegante */}
        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          zIndex={9999} // Aumentado para garantir que fique sempre no topo
          bg="rgba(15, 15, 15, 0.98)" // Fundo mais escuro e sólido
          backdropFilter="blur(25px)"
          borderTopRadius="24px"
          boxShadow="0 -4px 30px rgba(0, 0, 0, 0.5), 0 -1px 0px rgba(255, 255, 255, 0.1)"
          px={3}
          py={1.5} // Ainda mais compacto
          borderTop="1px solid"
          borderColor="rgba(255, 255, 255, 0.15)"
          // Garantia de posição fixa em Android usando sx prop
          sx={{
            transform: "translate3d(0, 0, 0)", // Force hardware acceleration
            WebkitTransform: "translate3d(0, 0, 0)",
            willChange: "transform",
            WebkitOverflowScrolling: "touch",
            touchAction: "none",
          }}
        >
          {/* Navigation Bar - Mais compacto e elegante */}
          <Flex
            justifyContent="space-around"
            alignItems="center"
            px={1}
            py={0.5}
            minHeight="60px" // Altura mínima garantida
          >
            {/* Income Button - Menor e mais elegante */}
            <Flex flexDirection="column" alignItems="center" gap={0.5}>
              <Box
                as="button"
                onClick={onIncomeClick}
                bg="linear-gradient(135deg, #10b981 0%, #047857 100%)"
                borderRadius="full"
                p={2.5} // Reduzido para botão menor
                boxShadow="0 3px 12px rgba(16, 185, 129, 0.4), inset 0 1px 0px rgba(255, 255, 255, 0.2)"
                border="1px solid rgba(16, 185, 129, 0.3)"
                _hover={{
                  transform: "scale(1.05) translateY(-1px)",
                  boxShadow:
                    "0 5px 18px rgba(16, 185, 129, 0.5), inset 0 1px 0px rgba(255, 255, 255, 0.3)",
                }}
                _active={{
                  transform: "scale(0.95) translateY(0px)",
                  boxShadow:
                    "0 2px 8px rgba(16, 185, 129, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                transition="all 0.15s cubic-bezier(0.4, 0, 0.2, 1)"
                cursor="pointer"
                width="40px" // Reduzido de 48px
                height="40px" // Reduzido de 48px
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <Icon as={FaDownload} color="white" boxSize="16px" />
              </Box>
              <Box
                fontSize="9px"
                color="rgba(255, 255, 255, 0.8)"
                fontWeight="600"
                textAlign="center"
                letterSpacing="0.3px"
                sx={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                Income
              </Box>
            </Flex>

            {/* Expense Button - Menor e mais elegante */}
            <Flex flexDirection="column" alignItems="center" gap={0.5}>
              <Box
                as="button"
                onClick={onExpenseClick}
                bg="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                borderRadius="full"
                p={2.5} // Reduzido para botão menor
                boxShadow="0 3px 12px rgba(239, 68, 68, 0.4), inset 0 1px 0px rgba(255, 255, 255, 0.2)"
                border="1px solid rgba(239, 68, 68, 0.3)"
                _hover={{
                  transform: "scale(1.05) translateY(-1px)",
                  boxShadow:
                    "0 5px 18px rgba(239, 68, 68, 0.5), inset 0 1px 0px rgba(255, 255, 255, 0.3)",
                }}
                _active={{
                  transform: "scale(0.95) translateY(0px)",
                  boxShadow:
                    "0 2px 8px rgba(239, 68, 68, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
                transition="all 0.15s cubic-bezier(0.4, 0, 0.2, 1)"
                cursor="pointer"
                width="40px" // Reduzido de 48px
                height="40px" // Reduzido de 48px
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <Icon as={FaUpload} color="white" boxSize="16px" />
              </Box>
              <Box
                fontSize="9px"
                color="rgba(255, 255, 255, 0.8)"
                fontWeight="600"
                textAlign="center"
                letterSpacing="0.3px"
                sx={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                Outcome
              </Box>
            </Flex>

            {/* Download PDF Button - Wrapper com tamanho consistente */}
            <Box>
              <DownloadPdfButton
                transactions={transactions}
                balance={balance}
              />
            </Box>

            {/* Task Manager Button - Wrapper com tamanho consistente */}
            <Box>
              <TaskManagerWithButton />
            </Box>
          </Flex>
        </Box>

        {/* Spacer para evitar que o conteúdo da página fique atrás dos botões */}
        <Box height="80px" />
      </Box>
    </>
  );
};

export default ActionButtons;
