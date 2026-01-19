import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  Text,
  IconButton,
  Progress,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import RegisterService from "../Services/registerservice";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const getPasswordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 12.5;
    if (/[@$!%*?&]/.test(password)) strength += 12.5;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength < 50) return "red";
    if (strength < 75) return "orange";
    if (strength < 100) return "yellow";
    return "green";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        password,
      };

      if (emailRegex.test(email) && passwordRegex.test(password)) {
        const response = await RegisterService.register(userData);
        if (response.success) {
          toast({
            title: "Success",
            description: "Registered successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          
          setEmail("");
          setPassword("");
        } else {
          toast({
            title: "Error",
            description:
            response.message || "Failed to Register. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to Register. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <Box
        maxW="440px"
        w="100%"
        bg="white"
        borderRadius="xl"
        boxShadow="xl"
        p={8}
        mx="auto"
      >
        <VStack spacing={2} mb={8} textAlign="center">
          <Heading size="lg" color="gray.800">
            Create Account
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Sign up to get started
          </Text>
        </VStack>

        <VStack spacing={5} as="form" onSubmit={handleSubmit}>
          <FormControl isInvalid={!emailRegex.test(email) && email !== ""}>
            <FormLabel fontSize="sm" color="gray.700">
              Email
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" h="full">
                <EmailIcon color="gray.400" boxSize={4} />
              </InputLeftElement>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                size="lg"
                focusBorderColor="teal.400"
                bg="gray.50"
                border="1px"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
              />
            </InputGroup>
            {!emailRegex.test(email) && email !== "" && (
              <Text fontSize="xs" color="red.500" mt={1}>
                Please enter a valid email
              </Text>
            )}
          </FormControl>

          <FormControl
            isInvalid={!passwordRegex.test(password) && password !== ""}
          >
            <FormLabel fontSize="sm" color="gray.700">
              Password
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" h="full">
                <LockIcon color="gray.400" boxSize={4} />
              </InputLeftElement>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Create a strong password"
                size="lg"
                focusBorderColor="teal.400"
                bg="gray.50"
                border="1px"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
              />
              <InputRightElement h="full">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  size="sm"
                  color="gray.500"
                  _hover={{ color: "teal.500" }}
                />
              </InputRightElement>
            </InputGroup>

            {password && (
              <Box mt={2}>
                <Progress
                  value={getPasswordStrength()}
                  size="xs"
                  colorScheme={getPasswordStrengthColor()}
                  borderRadius="full"
                />
              </Box>
            )}

            {!passwordRegex.test(password) && password !== "" && (
              <Text fontSize="xs" color="gray.500" mt={2}>
                Must include uppercase, lowercase, number, special character
                (min 8 chars)
              </Text>
            )}
          </FormControl>
          <Button
            type="submit"
            size="lg"
            width="full"
            colorScheme="teal"
            isDisabled={
              !emailRegex.test(email) || !passwordRegex.test(password)
            }
            mt={2}
          >
            Sign Up
          </Button>
          <Text fontSize="sm" color="gray.600" pt={2}>
            Already have an account?{" "}
            <Text
              as={Link}
              to="/login"
              color="teal.500"
              fontWeight="medium"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              Sign in
            </Text>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}

export default Register;
