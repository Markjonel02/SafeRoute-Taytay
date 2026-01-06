import { Box, Flex, Text } from "@chakra-ui/react";
import {
  FaTachometerAlt,
  FaUsers,
  FaRoute,
  FaCar,
  FaChartLine,
  FaCog,
  FaFileAlt,
} from "react-icons/fa";

const NaItems = [
  { name: "Dashboard", path: "/", icon: FaTachometerAlt },
  { name: "User Management", path: "/user-management", icon: FaUsers },
  { name: "Route Planning", path: "/route-planning", icon: FaRoute },
  { name: "Vehicle Tracking", path: "/vehicle-tracking", icon: FaCar },
  {
    name: "Performance & Reports",
    path: "/performance-reports",
    icon: FaChartLine,
  },
  { name: "Settings", path: "/settings", icon: FaCog },
  { name: "System Logs", path: "/system-logs", icon: FaFileAlt },
];

const Navigations = ({ isCollapsed }) => {
  return (
    <Box display="flex" flexDirection="column">
      {NaItems.map((item) => {
        const Icon = item.icon;
        return (
          <Flex
            key={item.name}
            align="center"
            justify={isCollapsed ? "center" : "flex-start"} // ✅ center when collapsed
            mb={3}
            p={2}
            borderRadius="md"
            _hover={{ bg: "blue.600", cursor: "pointer", color: "white" }}
          >
            <Box as={Icon} boxSize={5} /> {/* ✅ consistent icon size */}
            {!isCollapsed && (
              <Text ml={3} fontSize="sm">
                {item.name}
              </Text>
            )}
          </Flex>
        );
      })}
    </Box>
  );
};

export default Navigations;
