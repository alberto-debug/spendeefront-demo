import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper = ({ children }: BackgroundWrapperProps) => {
  const ORB_OPACITY = 0.07;

  return (
    <Box
      w="100vw"
      minH="100vh"
      m={0}
      p={0}
      bg="#0A1122"
      bgImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiM2NEZERjYiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')"
      bgSize="cover"
      bgRepeat="no-repeat"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Gradient Orbs */}
      <Box
        position="absolute"
        w="300px"
        h="300px"
        borderRadius="full"
        bgGradient="linear(135deg, #10B981 0%, #0EA5E9 100%)"
        filter="blur(120px)"
        opacity={ORB_OPACITY}
        top="-100px"
        left="-100px"
        zIndex={0}
      />
      <Box
        position="absolute"
        w="400px"
        h="400px"
        borderRadius="full"
        bgGradient="linear(135deg, #8B5CF6 0%, #EC4899 100%)"
        filter="blur(130px)"
        opacity={0.05}
        bottom="-150px"
        right="-150px"
        zIndex={0}
      />

      {/* Main Content */}
      <Box
        as="main"
        w="100%"
        maxW={{ base: "100%", md: "900px" }}
        bg="#111827"
        border="1px solid rgba(255, 255, 255, 0.05)"
        borderRadius="lg"
        shadow="xl"
        p={6}
        position="relative"
        zIndex={1}
      >
        {children}
      </Box>
    </Box>
  );
};

export default BackgroundWrapper;
