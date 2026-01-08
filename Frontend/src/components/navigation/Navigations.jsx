import React, { memo } from "react";
import {
  Box,
  Flex,
  Text,
  Tooltip,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaRoute,
  FaCar,
  FaChartLine,
  FaCog,
  FaFileAlt,
} from "react-icons/fa";

// 🔹 Config-driven navigation items
const NAV_ITEMS = [
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

// 🔹 Single navigation item component
const NavigationItem = ({ item, isCollapsed }) => {
  const hoverBg = useColorModeValue("blue.600", "blue.300");
  const inactiveColor = useColorModeValue("blackAlpha.700", "gray.300"); // ✅ fixed typo + set black
  const activeColor = useColorModeValue("white", "gray.900");

  return (
    <Tooltip label={item.name} placement="right" isDisabled={!isCollapsed}>
      <Flex
        as={NavLink}
        to={item.path}
        align="center"
        justify={isCollapsed ? "center" : "flex-start"}
        mb={2}
        p={2}
        borderRadius="md"
        transition="all 0.2s ease"
        color={inactiveColor} // 🔹 default inactive color (black)
        _hover={{ bg: hoverBg, color: activeColor }}
        _activeLink={{ bg: hoverBg, color: activeColor }}
        aria-label={isCollapsed ? item.name : undefined}
      >
        {/* Icon inherits parent color */}
        <Icon as={item.icon} boxSize={5} />

        {/* Text inherits parent color */}
        {!isCollapsed && (
          <Text ml={3} fontSize="sm" whiteSpace="nowrap">
            {item.name}
          </Text>
        )}
      </Flex>
    </Tooltip>
  );
};

// 🔹 Main navigation component
const Navigations = memo(({ isCollapsed }) => (
  <Box>
    {NAV_ITEMS.map((item) => (
      <NavigationItem key={item.name} item={item} isCollapsed={isCollapsed} />
    ))}
  </Box>
));

export default Navigations;
