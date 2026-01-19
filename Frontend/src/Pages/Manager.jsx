import { Box, Flex, Heading, Text, Button, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Context/UseAuth";

function Manager() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    setAuth({});
    toast({
      title: "Success",
      description: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/login", { replace: true });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <Box
        maxW="600px"
        w="100%"
        bg="white"
        borderRadius="xl"
        boxShadow="xl"
        p={12}
      >
        <VStack spacing={6} textAlign="center">
          <Heading size="xl" color="gray.800">
            Manager Dashboard
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Welcome, {auth?.user?.email || "Manager"}!
          </Text>
          <Text fontSize="md" color="gray.500">
            This is the manager home page
          </Text>
          <Button
            onClick={handleLogout}
            size="lg"
            colorScheme="teal"
            w="full"
            mt={4}
            _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
            transition="all 0.2s"
          >
            Sign Out
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default Manager;