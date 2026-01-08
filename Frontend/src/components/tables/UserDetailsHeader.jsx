import {
  Box,
  Flex,
  Text,
  Avatar,
  Badge,
  Button,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiEdit, FiEye } from "react-icons/fi";

const UserDetailsHeader = ({ user }) => {
  const bg = useColorModeValue("white", "gray.800");
  const muted = useColorModeValue("gray.500", "gray.400");

  if (!user) return null;

  return (
    <Box
      bg={bg}
      p={6}
      rounded="2xl"
      boxShadow="sm"
      mb={6}
      border="1px solid"
      borderColor="gray.200"
    >
      {/* Header */}
      <Flex justify="space-between" align="start" mb={6}>
        <Flex gap={4}>
          <Avatar size="xl" name={`${user.firstname} ${user.lastname}`} />

          <Box>
            <Flex align="center" gap={3}>
              <Text fontSize="xl" fontWeight="bold">
                {user.firstname} {user.lastname}
              </Text>
              <Badge colorScheme="green">Active</Badge>
            </Flex>

            <Text fontSize="sm" color={muted}>
              Email address: {user.email}
            </Text>
            <Text fontSize="sm" color={muted}>
              Phone number: {user.phonenumber}
            </Text>
            <Text fontSize="sm" color={muted}>
              Address: {user.address}, {user.city}
            </Text>
          </Box>
        </Flex>

        <Flex gap={2}>
          <Button size="sm" leftIcon={<FiEye />} variant="outline">
            View Profile
          </Button>
          <Button size="sm" leftIcon={<FiEdit />} colorScheme="blue">
            Edit User
          </Button>
        </Flex>
      </Flex>

      {/* Stats */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
        <StatBox title="Role" value={user.role} />
        <StatBox title="Gender" value={user.gender} />
        <StatBox title="Age" value={user.age} />
        <StatBox
          title="Status"
          value={user.userstatus === 1 ? "Active" : "Inactive"}
        />
      </SimpleGrid>
    </Box>
  );
};

const StatBox = ({ title, value }) => (
  <Box
    p={4}
    bg="gray.50"
    rounded="xl"
    border="1px solid"
    borderColor="gray.200"
  >
    <Text fontSize="sm" color="gray.500" mb={1}>
      {title}
    </Text>
    <Text fontSize="lg" fontWeight="semibold">
      {value}
    </Text>
  </Box>
);

export default UserDetailsHeader;
