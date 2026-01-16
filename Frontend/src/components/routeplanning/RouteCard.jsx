// Route Card Component
import {
  VStack,
  HStack,
  Card,
  CardBody,
  Icon,
  Badge,
  Text,
} from "@chakra-ui/react";
import { FiClock, FiDollarSign } from "react-icons/fi";
const RouteCard = ({ route, selected, onSelect }) => {
  const modeIcons = {
    drive: "🚗",
    flight: "✈️",
    railway: "🚂",
    ride: "🚕",
  };

  return (
    <Card
      bg={selected ? "purple.50" : "white"}
      border="2px"
      borderColor={selected ? "purple.600" : "gray.200"}
      mb={3}
      cursor="pointer"
      onClick={onSelect}
      transition="all 0.2s"
      _hover={{ borderColor: "purple.600", shadow: "md" }}
    >
      <CardBody>
        <VStack spacing={3} align="stretch">
          {/* Top Section - Mode and Time */}
          <HStack justify="space-between">
            <HStack spacing={2}>
              <Text fontSize="2xl">{modeIcons[route.mode]}</Text>
              <VStack spacing={0} align="start">
                <Text fontWeight="bold" textTransform="uppercase" fontSize="sm">
                  {route.mode}
                </Text>
                <Text fontSize="xs" color="gray.600">
                  {route.fromName} → {route.toName}
                </Text>
              </VStack>
            </HStack>
            <Badge
              bg="purple.600"
              color="white"
              px={3}
              py={1}
              borderRadius="full"
            >
              <HStack spacing={1}>
                <Icon as={FiDollarSign} />
                <Text>₹{route.cost}</Text>
              </HStack>
            </Badge>
          </HStack>

          <Divider />

          {/* Time and Distance Info */}
          <HStack justify="space-between" spacing={2}>
            <HStack spacing={1} fontSize="sm">
              <Icon as={FiClock} color="purple.600" />
              <VStack spacing={0}>
                <Text fontWeight="bold">{route.duration}</Text>
                <Text fontSize="xs" color="gray.600">
                  {route.distance} km
                </Text>
              </VStack>
            </HStack>

            {route.mode === "drive" && (
              <VStack spacing={0} align="end" fontSize="xs">
                <Text fontWeight="bold">{route.avgSpeed} km/h</Text>
                <Text color="gray.600">Avg Speed</Text>
              </VStack>
            )}
          </HStack>

          {/* Traffic Status */}
          {route.mode === "drive" && route.congestionLevel && (
            <TrafficStatus level={route.congestionLevel} />
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default RouteCard;
