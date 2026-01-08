import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tabs,
  TabList,
  Tab,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiChevronDown,
  FiMoreHorizontal,
  FiEdit,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import { useState } from "react";
import UserDetailsHeader from "./UserDetailsHeader";

const users = [
  {
    id: "2501130",
    name: "Albert Flores",
    email: "albert@example.com",
    role: "Admin",
    status: "Active",
    created: "10/12/2022",
  },
  {
    id: "2501131",
    name: "Ronald Richards",
    email: "ronald@example.com",
    role: "Moderator",
    status: "Suspended",
    created: "10/12/2022",
  },
  {
    id: "2501132",
    name: "Jane Cooper",
    email: "jane@example.com",
    role: "User",
    status: "Pending",
    created: "10/12/2022",
  },
];

const statusColor = {
  Active: "green",
  Pending: "orange",
  Suspended: "red",
};

const UserManagementTable = () => {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");
  const muted = useColorModeValue("gray.500", "gray.400");

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const allSelected = selectedUsers.length === users.length;
  const isIndeterminate =
    selectedUsers.length > 0 && selectedUsers.length < users.length;

  const toggleSelectAll = (checked) => {
    setSelectedUsers(checked ? users.map((u) => u.id) : []);
  };

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* USER DETAILS HEADER */}
      <UserDetailsHeader user={selectedUser} />

      {/* TABLE CARD */}
      <Box
        bg={bg}
        rounded="2xl"
        p={6}
        boxShadow="sm"
        border="1px solid"
        borderColor={border}
      >
        {/* Tabs */}
        <Tabs variant="unstyled" mb={4}>
          <TabList gap={6}>
            <Tab fontWeight="semibold" _selected={{ color: "blue.500" }}>
              Users (120)
            </Tab>
            <Tab color={muted}>Roles</Tab>
            <Tab color={muted}>Activity</Tab>
            <Tab color={muted}>Files</Tab>
          </TabList>
        </Tabs>

        {/* Toolbar */}
        <Flex justify="space-between" mb={4} gap={4} flexWrap="wrap">
          <Flex gap={3}>
            <Input placeholder="Search user" size="sm" maxW="220px" />
            <Button size="sm" variant="outline" rightIcon={<FiChevronDown />}>
              Sort by
            </Button>
          </Flex>

          <Button size="sm" colorScheme="blue">
            Create user
          </Button>
        </Flex>

        {/* Table */}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  isChecked={allSelected}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </Th>
              <Th>User ID</Th>
              <Th>User</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <Th textAlign="right">Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {users.map((user) => (
              <Tr
                key={user.id}
                bg={selectedUsers.includes(user.id) ? "blue.50" : "transparent"}
                _hover={{ bg: "gray.50" }}
              >
                <Td>
                  <Checkbox
                    isChecked={selectedUsers.includes(user.id)}
                    onChange={() => toggleUser(user.id)}
                  />
                </Td>

                <Td fontSize="sm">{user.id}</Td>

                <Td>
                  <Flex align="center" gap={3}>
                    <Avatar size="sm" name={user.name} />
                    <Box>
                      <Text fontWeight="medium">{user.name}</Text>
                      <Text fontSize="sm" color={muted}>
                        {user.email}
                      </Text>
                    </Box>
                  </Flex>
                </Td>

                <Td fontSize="sm">{user.role}</Td>

                <Td>
                  <Badge
                    colorScheme={statusColor[user.status]}
                    rounded="full"
                    px={3}
                  >
                    {user.status}
                  </Badge>
                </Td>

                <Td fontSize="sm">{user.created}</Td>

                <Td textAlign="right">
                  <Menu placement="bottom-end">
                    <MenuButton
                      as={IconButton}
                      icon={<FiMoreHorizontal />}
                      size="sm"
                      variant="ghost"
                    />
                    <MenuList rounded="xl" shadow="lg">
                      <MenuItem
                        icon={<FiEye />}
                        onClick={() => setSelectedUser(user)}
                      >
                        View
                      </MenuItem>
                      <MenuItem icon={<FiEdit />}>Edit</MenuItem>
                      <MenuItem icon={<FiTrash2 />} color="red.500">
                        Remove
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default UserManagementTable;
