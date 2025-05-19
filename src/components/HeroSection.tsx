
import React, { useState, useEffect } from "react";
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
  const [cardName, setCardName] = useState("João C. Santos");

  useEffect(() => {
    const storedName = localStorage.getItem("cardholderName");
    if (storedName) setCardName(storedName);
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCardName(name);
    localStorage.setItem("cardholderName", name);
  };

  return (
    <Box
      bg="linear-gradient(135deg, #1a1a1d 0%, #0C0F15 100%)"
      color="white"
      py={{ base: 8, md: 16 }}
      position="relative"
      overflow="hidden"
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
          {/* Texto */}
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

          {/* Cartão */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            w={{ base: "95vw", sm: "460px", md: "520px" }}
            maxW="600px"
            flexShrink={0}
          >
            <MotionBox
              bg="linear-gradient(135deg, #000000 0%, #1a1a1a 100%)"
              borderRadius="2xl"
              p={6}
              h={{ base: "220px", sm: "260px", md: "300px" }}
              boxShadow="0px 0px 30px rgba(0, 0, 0, 0.9)"
              position="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              overflow="visible"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              {/* Logos */}
              <Flex justify="space-between" mb={{ base: 3, md: 4 }}>
                <Icon as={RiVisaLine} w={{ base: 10, md: 12 }} h={{ base: 6, md: 8 }} color="white" />
                <Icon
                  as={FaWifi}
                  w={{ base: 5, md: 6 }}
                  h={{ base: 5, md: 6 }}
                  transform="rotate(90deg)"
                  color="whiteAlpha.700"
                />
              </Flex>

              {/* Chip e Número */}
              <Flex justify="space-between" align="center" mb={{ base: 3, md: 4 }}>
                <Box
                  w="50px"
                  h="35px"
                  bg="linear-gradient(135deg, #ffdd55, #b8860b, #fff89a)"
                  borderRadius="xs"
                  boxShadow="0 0 10px 2px rgba(255, 221, 85, 0.7), inset 0 0 6px rgba(255, 255, 150, 0.9)"
                  position="relative"
                >
                  <Box
                    position="absolute"
                    top="45%"
                    left="10%"
                    right="10%"
                    height="2px"
                    bg="rgba(0,0,0,0.4)"
                  />
                </Box>
                <Text
                  fontSize={{ base: "xs", sm: "sm", md: "md" }}
                  fontFamily="'Courier New', monospace"
                  color="white"
                  letterSpacing="2px"
                  whiteSpace="nowrap"
                >
                  4929 7534 2315 5466
                </Text>
              </Flex>

              {/* Nome e Validade */}
              <Flex justify="space-between" align="center" mt={0} mb={{ base: 2, md: 3 }}>
                <Box maxW={{ base: "55%", sm: "70%", md: "60%" }}>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.400" mb={1}>
                    CARDHOLDER
                  </Text>
                  <Input
                    variant="unstyled"
                    value={cardName}
                    onChange={handleNameChange}
                    color="white"
                    fontWeight="medium"
                    fontSize={{ base: "sm", md: "md" }}
                    maxW="100%"
                    borderBottom="1px solid rgba(255,255,255,0.2)"
                    _focus={{ borderBottom: "1px solid white" }}
                    spellCheck={false}
                    autoComplete="off"
                    px={0}
                    py={1}
                    maxLength={30}
                  />
                </Box>
                <Box>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.400" mb={1}>
                    EXP
                  </Text>
                  <Text fontSize={{ base: "sm", md: "md" }} color="white" fontWeight="medium">
                    04/28
                  </Text>
                </Box>
              </Flex>

              {/* Saldo */}
              <Flex justify="space-between" align="center" mt={0}>
                <Box>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.400">
                    Balance
                  </Text>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                    color="white"
                    fontFamily="monospace"
                    style={{
                      filter: showBalance ? "none" : "blur(3px)",
                    }}
                    whiteSpace="nowrap"
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
                  size={{ base: "sm", md: "md" }}
                  ml={2}
                />
              </Flex>

              {/* Brilho */}
              <Box
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                borderRadius="2xl"
                background="linear-gradient(115deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.15) 70%)"
                backgroundSize="200% 100%"
                animation="shine 6s infinite linear"
                sx={{
                  "@keyframes shine": {
                    "0%": { backgroundPosition: "200% 0" },
                    "100%": { backgroundPosition: "-200% 0" },
                  },
                }}
                pointerEvents="none"
              />
            </MotionBox>
          </MotionBox>
        </MotionFlex>
      </Container>
    </Box>
  );
};

export default HeroSection;
