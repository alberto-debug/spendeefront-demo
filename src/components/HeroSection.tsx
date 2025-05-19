
import React, { useState, useEffect, TouchEvent } from "react";
import {
  Box,
  Text,
  Flex,
  Icon,
  IconButton,
  Container,
  Heading,
  VStack,
  Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaWifi } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface HeroSectionProps {
  balance: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ balance }) => {
  const [showBalance, setShowBalance] = useState(false);
  const [cardholderName, setCardholderName] = useState("João C. Santos");
  const [isFlipped, setIsFlipped] = useState(false);

  // Load saved name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("cardholderName");
    if (savedName) setCardholderName(savedName);
  }, []);

  // Save name on change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCardholderName(val);
    localStorage.setItem("cardholderName", val);
  };

  // Touch swipe handling for flip animation
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;
    // Swipe threshold (px)
    const threshold = 50;
    if (diffX > threshold) setIsFlipped(false); // swipe right = front
    else if (diffX < -threshold) setIsFlipped(true); // swipe left = back
    setTouchStartX(null);
  };

  return (
    <Box
      bg="linear-gradient(135deg, #1a1a1d 0%, #0C0F15 100%)"
      color="white"
      py={{ base: 8, md: 16 }}
      position="relative"
      overflow="hidden"
      minH={{ base: "50vh", md: "auto" }}
      display="flex"
      alignItems="center"
    >
      <Container maxW="container.xl">
        <MotionFlex
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap={10}
        >
          {/* Left Text */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            flex="1"
            textAlign={{ base: "center", lg: "left" }}
          >
            <VStack align="start" spacing={6} maxW="600px">
              <Heading
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="bold"
                bgGradient="linear(to-r, #00ff5f, #B3EA1B)"
                bgClip="text"
              >
                Smart Money Management
              </Heading>
              <Text fontSize="xl" color="whiteAlpha.800">
                Controle seu dinheiro com um cartão moderno e inteligente.
              </Text>
            </VStack>
          </MotionBox>

          {/* Realistic Card */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            w={{ base: "95vw", sm: "520px", md: "560px" }}
            maxW="600px"
            flexShrink={0}
            sx={{ perspective: "1200px" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <MotionBox
              position="relative"
              h={{ base: "280px", sm: "300px", md: "320px" }}
              borderRadius="2xl"
              boxShadow="0 0 40px rgba(0,0,0,0.95)"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.7s",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front */}
              <Box
                bg="linear-gradient(135deg, #000000 0%, #111111 100%)"
                position="absolute"
                w="100%"
                h="100%"
                borderRadius="2xl"
                color="white"
                sx={{ backfaceVisibility: "hidden" }}
                p={8}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                {/* Logos */}
                <Flex justify="space-between" mb={6} flexShrink={0}>
                  <Icon as={RiVisaLine} w={12} h={8} color="white" />
                  <Icon
                    as={FaWifi}
                    w={6}
                    h={6}
                    transform="rotate(90deg)"
                    color="whiteAlpha.700"
                  />
                </Flex>

                {/* Chip + Number */}
                <Flex justify="space-between" align="center" mb={6} flexShrink={0}>
                  <Box
                    w="55px"
                    h="40px"
                    bg="linear-gradient(135deg, #f9e265, #a0843c)"
                    borderRadius="xs"
                    position="relative"
                    boxShadow="0 0 10px 2px #f9e265 inset, 0 2px 6px rgba(0,0,0,0.5)"
                  >
                    <Box
                      position="absolute"
                      top="45%"
                      left="10%"
                      right="10%"
                      height="2px"
                      bg="rgba(0,0,0,0.5)"
                    />
                    <Box
                      position="absolute"
                      top="30%"
                      left="15%"
                      width="5px"
                      height="8px"
                      bg="rgba(255,255,255,0.6)"
                      borderRadius="1px"
                      boxShadow="0 0 5px 1px rgba(255,255,255,0.9)"
                    />
                    <Box
                      position="absolute"
                      top="55%"
                      left="20%"
                      width="7px"
                      height="4px"
                      bg="rgba(255,255,255,0.8)"
                      borderRadius="1px"
                      boxShadow="0 0 3px 1px rgba(255,255,255,0.8)"
                    />
                  </Box>

                  <Text
                    fontSize="lg"
                    fontFamily="'Courier New', monospace"
                    color="white"
                    letterSpacing="3px"
                    flexShrink={0}
                  >
                    4929 7534 2315 5466
                  </Text>
                </Flex>

                {/* Name + Expiry */}
                <Flex justify="space-between" align="center" mt={4} flexShrink={0}>
                  <Box maxW="60%">
                    <Text fontSize="sm" color="gray.400" mb={1} userSelect="none">
                      CARDHOLDER
                    </Text>
                    <Input
                      value={cardholderName}
                      onChange={handleNameChange}
                      variant="unstyled"
                      fontSize="md"
                      color="white"
                      fontWeight="medium"
                      maxLength={30}
                      _focus={{ outline: "none", borderBottom: "1px solid #B3EA1B" }}
                      sx={{
                        caretColor: "#B3EA1B",
                        userSelect: "text",
                        px: 0,
                      }}
                    />
                  </Box>

                  <Box flexShrink={0}>
                    <Text fontSize="sm" color="gray.400" mb={1} userSelect="none">
                      EXP
                    </Text>
                    <Text fontSize="md" color="white" fontWeight="medium" userSelect="none">
                      04/28
                    </Text>
                  </Box>
                </Flex>

                {/* Balance */}
                <Flex justify="space-between" align="center" mt={6} flexShrink={0}>
                  <Box>
                    <Text fontSize="sm" color="gray.400" userSelect="none">
                      Balance
                    </Text>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color="white"
                      fontFamily="monospace"
                      style={{
                        filter: showBalance ? "none" : "blur(3px)",
                        userSelect: "none",
                      }}
                    >
                      {showBalance ? `$${balance.toFixed(2)}` : "••••••"}
                    </Text>
                  </Box>

                  <IconButton
                    icon={showBalance ? <FaEyeSlash /> : <FaEye />}
                    aria-label="Toggle balance"
                    colorScheme="whiteAlpha"
                    variant="ghost"
                    onClick={() => setShowBalance(!showBalance)}
                    flexShrink={0}
                  />
                </Flex>

                {/* Reflection shine */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  w="100%"
                  h="100%"
                  borderRadius="2xl"
                  background="linear-gradient(115deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.03) 60%)"
                  backgroundSize="200% 100%"
                  animation="shine 5s infinite linear"
                  sx={{
                    "@keyframes shine": {
                      "0%": { backgroundPosition: "200% 0" },
                      "100%": { backgroundPosition: "-200% 0" },
                    },
                    pointerEvents: "none",
                  }}
                />
              </Box>

              {/* Back */}
              <Box
                bg="linear-gradient(135deg, #111111 0%, #000000 100%)"
                position="absolute"
                w="100%"
                h="100%"
                borderRadius="2xl"
                color="white"
                sx={{ backfaceVisibility: "hidden" }}
                transform="rotateY(180deg)"
                p={8}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                userSelect="none"
              >
                <Box
                  bg="rgba(0,0,0,0.9)"
                  h="40px"
                  borderRadius="sm"
                  mb={6}
                />
                <Box flex="1" />
                <Box
                  bg="rgba(255,255,255,0.9)"
                  h="30px"
                  borderRadius="sm"
                />
              </Box>
            </MotionBox>
          </MotionBox>
        </MotionFlex>
      </Container>
    </Box>
  );
};

export default HeroSection;
