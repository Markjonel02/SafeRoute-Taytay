// Routes List Component
import { Box } from "@chakra-ui/react";
import RouteCard from "./RouteCard";
import { FiAlertCircle } from "react-icons/fi";
const RoutesList = ({ routes, selectedRoute, onSelectRoute }) => (
  <Box w="full">
    {routes.length === 0 ? (
      <Card bg="gray.50" p={4} textAlign="center">
        <HStack justify="center" mb={2}>
          <Icon as={FiAlertCircle} color="gray.400" />
          <Text color="gray.500">No routes found</Text>
        </HStack>
        <Text fontSize="xs" color="gray.400">
          Search to see available options
        </Text>
      </Card>
    ) : (
      routes.map((route) => (
        <RouteCard
          key={route.id}
          route={route}
          selected={selectedRoute?.id === route.id}
          onSelect={() => onSelectRoute(route)}
        />
      ))
    )}
  </Box>
);

export default RoutesList;
