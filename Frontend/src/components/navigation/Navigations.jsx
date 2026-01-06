import { Box, Flex, Text, Tooltip, Icon } from "@chakra-ui/react";
import {
  FaTachometerAlt,
  FaUsers,
  FaRoute,
  FaCar,
  FaChartLine,
  FaCog,
  FaFileAlt,
} from "react-icons/fa";

const NavItems = [
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
    <Box>
      {NavItems.map((item) => (
        <Tooltip
          key={item.name}
          label={item.name}
          placement="right"
          isDisabled={!isCollapsed}
        >
          <Flex
            align="center"
            justify={isCollapsed ? "center" : "flex-start"}
            mb={2}
            p={2}
            borderRadius="md"
            transition="all 0.2s ease"
            _hover={{ bg: "blue.600", cursor: "pointer", color: "white" }}
          >
            <Icon as={item.icon} boxSize={5} />
            {!isCollapsed && (
              <Text ml={3} fontSize="sm" whiteSpace="nowrap">
                {item.name}
              </Text>
            )}
          </Flex>
        </Tooltip>
      ))}
    </Box>
  );
};

export default Navigations;
