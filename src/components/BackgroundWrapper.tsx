// components/BackgroundWrapper.tsx
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper = ({ children }: BackgroundWrapperProps) => {
  return (
    <Box
      w="100%"
      p={8}
      background="#0A1122"
      backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiM2NEZERjYiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')"
      display="flex"
      flexDirection="column"
      alignItems="center"
      flex="1"
      position="relative"
      overflow="hidden"
    >
      {/* Background gradient orbs */}
      <Box
        position="absolute"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)"
        filter="blur(120px)"
        opacity="0.07"
        top="-100px"
        left="-100px"
        zIndex="0"
      />
      <Box
        position="absolute"
        width="400px"
        height="400px"
        borderRadius="full"
        bg="linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)"
        filter="blur(130px)"
        opacity="0.05"
        bottom="-150px"
        right="-150px"
        zIndex="0"
      />

      <Box
        as="main"
        w="100%"
        maxW="600px"
        bg="#111827"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.05)"
        borderRadius="lg"
        shadow="xl"
        p={6}
        position="relative"
        zIndex="1"
      >
        {children}
      </Box>
    </Box>
  );
};

export default BackgroundWrapper;
