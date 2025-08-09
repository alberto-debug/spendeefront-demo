// components/DeleteConfirmationModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from "@chakra-ui/react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg="#111827"
        borderColor="#1E293B"
        borderWidth="1px"
        borderRadius="xl"
      >
        <ModalHeader color="white">Delete Transaction</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Text color="white">
            Are you sure you want to delete this transaction?
          </Text>
          <Text color="#94A3B8" fontSize="sm" mt={2}>
            This action cannot be undone.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            color="white"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            bg="#F43F5E"
            color="white"
            _hover={{
              bg: "#E11D48",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(244, 63, 94, 0.4)",
            }}
            _active={{ bg: "#BE123C" }}
            onClick={onConfirm}
            isLoading={isLoading}
            borderRadius="full"
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
