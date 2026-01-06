"use client";

import React from "react";
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import {
  FaCarCrash,
  FaShieldAlt,
  FaExclamationCircle,
  FaCheckCircle,
  FaArrowUp,
} from "react-icons/fa";

const stats = [
  { label: "Total Accidents", value: 120, icon: FaCarCrash, color: "red.500" },
  { label: "Crimes", value: 80, icon: FaShieldAlt, color: "orange.500" },
  {
    label: "New Incidents",
    value: 45,
    icon: FaExclamationCircle,
    color: "yellow.500",
  },
  {
    label: "Resolved Incidents",
    value: 100,
    icon: FaCheckCircle,
    color: "green.500",
  },
  {
    label: "Escalated Incidents",
    value: 15,
    icon: FaArrowUp,
    color: "purple.500",
  },
];

const AdminDashboard = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("md", "dark-lg");

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Incident Overview
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={6}>
        {stats.map((stat) => (
          <Flex
            key={stat.label}
            direction="column"
            align="center"
            justify="center"
            bg={cardBg}
            shadow={cardShadow}
            borderRadius="lg"
            p={6}
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
          >
            <Icon as={stat.icon} boxSize={10} color={stat.color} mb={3} />
            <Text fontSize="lg" fontWeight="semibold">
              {stat.label}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color={stat.color}>
              {stat.value}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AdminDashboard;
