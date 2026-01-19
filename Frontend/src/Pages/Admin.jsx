import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Context/UseAuth";
import User from "../Components/User";

function Admin() {
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
    <Flex minH="100vh" bg="gray.50" py={8} px={4}>
      <Box maxW="1200px" w="100%" mx="auto">
        <VStack spacing={6} w="100%">
          {/* Header Section */}
          <Box w="100%" bg="white" borderRadius="xl" boxShadow="md" p={6}>
            <HStack justify="space-between" align="center" wrap="wrap" gap={4}>
              <VStack align="start" spacing={1}>
                <Heading size="lg" color="gray.800">
                  Admin Dashboard
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Welcome, {auth?.user?.email || "Admin"}!
                </Text>
              </VStack>
              <Button
                onClick={handleLogout}
                colorScheme="teal"
                size="md"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                Sign Out
              </Button>
            </HStack>
          </Box>

          {/* User Component with Update Functionality */}
          <User showUpdateButton={true} />
        </VStack>
      </Box>
    </Flex>
  );
}

export default Admin;
