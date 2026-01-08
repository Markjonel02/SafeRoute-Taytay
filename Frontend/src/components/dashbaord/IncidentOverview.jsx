import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import {
  FaCarCrash,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowUp,
} from "react-icons/fa";
import StatCard from "../ui/statcards/StatCard";

const incidentStats = [
  {
    label: "Total Accidents",
    value: "120",
    icon: FaCarCrash,
    color: "red",
    trend: 12,
  },
  {
    label: "Crimes",
    value: "80",
    icon: FaShieldAlt,
    color: "orange",
    trend: -4,
  },
  {
    label: "New Incidents",
    value: "45",
    icon: FaExclamationTriangle,
    color: "yellow",
    trend: 9,
  },
  {
    label: "Resolved",
    value: "100",
    icon: FaCheckCircle,
    color: "green",
    trend: 18,
  },
  {
    label: "Escalated",
    value: "15",
    icon: FaArrowUp,
    color: "purple",
    trend: 2,
  },
];

const IncidentOverview = () => {
  return (
    <Box p={3} rounded="2xl">
      <Text fontSize="lg" fontWeight="semibold" mb={5}>
        Incident Overview
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} spacing={5}>
        {incidentStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default IncidentOverview;
