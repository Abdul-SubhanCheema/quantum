import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import useAxiosPrivate from "./useAxiosPrivate";
import AdminService from "../Services/adminservice";
import { useLocation,useNavigate } from "react-router-dom";

const User = ({ showUpdateButton = false }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [updating, setUpdating] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    fetchUsers(isMounted);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const fetchUsers = async (isMounted = true) => {
    try {
      setLoading(true);
      const response = await AdminService.getAllUsers(axiosPrivate);
      
      if (isMounted && response.success) {
        setUsers(response.users);
      }
    } catch (error) {
      if (isMounted) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "Failed to fetch users",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login", { replace: true, state: { from: location } });
        
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  const handleUpdateRole = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    onOpen();
  };

  const confirmUpdateRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      setUpdating(true);
      const response = await AdminService.updateUserRole(
        axiosPrivate,
        selectedUser._id,
        newRole
      );
      
      if (response.success) {
        toast({
          title: "Success",
          description: "User role updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        
        fetchUsers(true);
        onClose();
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update role",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setUpdating(false);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "red";
      case "manager":
        return "purple";
      case "user":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <Flex minH="100vh" bg="gray.50" py={8} px={4}>
      <Box maxW="1200px" w="100%" mx="auto">
        <VStack spacing={6} w="100%">
          {/* Header Section */}
          <Box w="100%" bg="white" borderRadius="xl" boxShadow="md" p={6}>
            <VStack align="start" spacing={1}>
              <Heading size="lg" color="gray.800">
                Users List
              </Heading>
              <Text fontSize="sm" color="gray.600">
                View all registered users
              </Text>
            </VStack>
          </Box>

          {/* Users Table Section */}
          <Box w="100%" bg="white" borderRadius="xl" boxShadow="md" p={6}>
            <Heading size="md" color="gray.800" mb={4}>
              All Users
            </Heading>

            {loading ? (
              <Flex justify="center" align="center" py={8}>
                <Spinner size="xl" color="teal.500" thickness="4px" />
              </Flex>
            ) : users.length === 0 ? (
              <Text textAlign="center" color="gray.500" py={8}>
                No users found
              </Text>
            ) : (
              <TableContainer>
                <Table variant="simple" size="md">
                  <Thead>
                    <Tr>
                      <Th>Email</Th>
                      <Th>Role</Th>
                      {showUpdateButton && <Th textAlign="center">Actions</Th>}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users.map((user) => (
                      <Tr key={user._id}>
                        <Td>{user.email}</Td>
                        <Td>
                          <Badge
                            colorScheme={getRoleBadgeColor(user.role)}
                            fontSize="sm"
                            px={3}
                            py={1}
                            borderRadius="full"
                          >
                            {user.role}
                          </Badge>
                        </Td>
                        {showUpdateButton && (
                          <Td textAlign="center">
                            <Button
                              size="sm"
                              colorScheme="teal"
                              onClick={() => handleUpdateRole(user)}
                              _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                              transition="all 0.2s"
                            >
                              Update Role
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </VStack>
      </Box>

      {/* Update Role Modal */}
      {showUpdateButton && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update User Role</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Text>
                  Update role for: <strong>{selectedUser?.email}</strong>
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Current role:{" "}
                  <Badge colorScheme={getRoleBadgeColor(selectedUser?.role)}>
                    {selectedUser?.role}
                  </Badge>
                </Text>
                <Select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  size="lg"
                  focusBorderColor="teal.400"
                >
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                </Select>
              </VStack>
            </ModalBody>

            <ModalFooter gap={3}>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="teal"
                onClick={confirmUpdateRole}
                isLoading={updating}
                loadingText="Updating..."
              >
                Update Role
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};

export default User;
