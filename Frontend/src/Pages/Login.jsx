import { useState } from "react";
import useAuth from "../Context/UseAuth";
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
  Checkbox,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import LoginService from "../Services/loginservice";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {

  const{setAuth}=useAuth();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        password,
      };

      if (emailRegex.test(email)) {
        const response = await LoginService.login(userData);
        if (response.success) {
          setAuth({email,password});
          toast({
            title: "Success",
            description: "Login successfully",
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
            response.message || "Failed to Login. Please try again.",
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
        description: "Failed to Login. Please try again.",
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
        {/* Header */}
        <VStack spacing={2} mb={8} textAlign="center">
          <Heading size="lg" color="gray.800">
            Welcome Back
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Sign in to your account
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

          <FormControl isInvalid={password !== "" && password.length < 6}>
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
                autoComplete="current-password"
                placeholder="Enter your password"
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
            {password !== "" && password.length < 6 && (
              <Text fontSize="xs" color="red.500" mt={1}>
                Password must be at least 6 characters
              </Text>
            )}
          </FormControl>

          <Flex w="full" justify="space-between" align="center">
            <Checkbox
              size="sm"
              colorScheme="teal"
              isChecked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              <Text fontSize="sm" color="gray.600">
                Remember me
              </Text>
            </Checkbox>
            <Text
              fontSize="sm"
              color="teal.500"
              fontWeight="medium"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              Forgot password?
            </Text>
          </Flex>

          <Button
            type="submit"
            size="lg"
            width="full"
            colorScheme="teal"
            isDisabled={!emailRegex.test(email) || password.length < 6}
            mt={2}
          >
            Sign In
          </Button>

          {/* Footer */}
          <Text fontSize="sm" color="gray.600" pt={2}>
            Don't have an account?{" "}
            <Text
              as={Link}
              to="/"
              color="teal.500"
              fontWeight="medium"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              Sign up
            </Text>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}

export default Login;
