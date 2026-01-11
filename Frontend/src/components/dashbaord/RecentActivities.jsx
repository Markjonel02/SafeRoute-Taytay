import {
  Box,
  Flex,
  Text,
  Badge,
  Icon,
  Avatar,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardBody,
  HStack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiClock, FiLogIn, FiMapPin, FiAlertTriangle } from "react-icons/fi";

const activities = [
  {
    id: 1,
    type: "login",
    user: "Mark Relles",
    action: "Logged in",
    time: "2 mins ago",
    status: "success",
  },
  {
    id: 2,
    type: "location",
    user: "Mark Relles",
    action: "Updated location (Taytay, Rizal)",
    time: "10 mins ago",
    status: "info",
  },
  {
    id: 3,
    type: "alert",
    user: "System",
    action: "Emergency alert triggered",
    time: "30 mins ago",
    status: "danger",
  },
  {
    id: 4,
    type: "login",
    user: "Rescuer Juan",
    action: "Logged in",
    time: "1 hour ago",
    status: "success",
  },
];

const statusColorScheme = {
  success: "green",
  info: "blue",
  danger: "red",
};

const activityIcon = {
  login: FiLogIn,
  location: FiMapPin,
  alert: FiAlertTriangle,
};

export default function RecentActivitiesTable() {
  const headerBg = useColorModeValue("gray.50", "gray.700");
  const rowHoverBg = useColorModeValue("gray.50", "gray.700");

  return (
    <Card borderRadius="2xl" boxShadow="sm">
      <CardBody p={0}>
        {/* Header */}
        <Flex
          justify="space-between"
          align="center"
          px={6}
          py={4}
          borderBottomWidth="1px"
        >
          <VStack align="start" spacing={0}>
            <Text fontSize="lg" fontWeight="semibold">
              Recent Activities
            </Text>
            <Text fontSize="sm" color="gray.500">
              Latest system and user actions
            </Text>
          </VStack>
          <Icon as={FiClock} color="gray.400" boxSize={5} />
        </Flex>

        {/* Table */}
        <TableContainer>
          <Table variant="simple" size="md">
            <Thead bg={headerBg}>
              <Tr>
                <Th>Activity</Th>
                <Th>User</Th>
                <Th>Time</Th>
                <Th textAlign="right">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {activities.map((activity) => (
                <Tr
                  key={activity.id}
                  _hover={{ bg: rowHoverBg }}
                  transition="background 0.2s"
                >
                  <Td>
                    <HStack spacing={3}>
                      <Box p={2} borderRadius="full" bg="gray.100">
                        <Icon
                          as={activityIcon[activity.type]}
                          boxSize={4}
                          color="gray.600"
                        />
                      </Box>
                      <Text fontSize="sm" fontWeight="medium">
                        {activity.action}
                      </Text>
                    </HStack>
                  </Td>

                  <Td>
                    <HStack spacing={3}>
                      <Avatar name={activity.user} size="sm" />
                      <Text fontSize="sm">{activity.user}</Text>
                    </HStack>
                  </Td>

                  <Td>
                    <Text fontSize="sm" color="gray.500">
                      {activity.time}
                    </Text>
                  </Td>

                  <Td textAlign="right">
                    <Badge
                      px={3}
                      py={1}
                      borderRadius="full"
                      textTransform="capitalize"
                      colorScheme={statusColorScheme[activity.status]}
                    >
                      {activity.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}
