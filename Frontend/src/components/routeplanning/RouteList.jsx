// Routes List Component
import { Box } from "@chakra-ui/react";
import RouteCard from "./RouteCard";
const RoutesList = ({ routes, selectedRoute, onSelectRoute }) => (
  <Box>
    {routes.map((route) => (
      <RouteCard
        key={route.id}
        route={route}
        selected={selectedRoute?.id === route.id}
        onSelect={() => onSelectRoute(route)}
      />
    ))}
  </Box>
);
export default RoutesList;
