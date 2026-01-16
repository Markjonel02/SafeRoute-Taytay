// Routes List Component
import { Box } from "@chakra-ui/react";
import RouteCard from "./RouteCard";
const RoutesList = ({ routes, selectedRoute, onSelectRoute }) => (
  <Box>
    {routes.length === 0 ? (
      <Card bg="gray.50" p={4} textAlign="center">
        <Text color="gray.500">
          No routes found. Search to see available options.
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
