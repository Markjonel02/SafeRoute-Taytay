import {
  Box,
  Flex,
  Text,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaCarCrash,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowUp,
} from "react-icons/fa";

const incidentStats = [
  { label: "Total Accidents", value: 120, icon: FaCarCrash, color: "red.400" },
  { label: "Crimes", value: 80, icon: FaShieldAlt, color: "orange.400" },
  {
    label: "New Incidents",
    value: 45,
    icon: FaExclamationTriangle,
    color: "yellow.500",
  },
  { label: "Resolved", value: 100, icon: FaCheckCircle, color: "green.400" },
  { label: "Escalated", value: 15, icon: FaArrowUp, color: "purple.400" },
];

const StatCard = ({ label, value, icon, color }) => {
  const bg = useColorModeValue("white", "gray.900");
  const border = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex
      direction="column"
      bg={bg}
      p={4}
      rounded="md"
      border="1px solid"
      borderColor={border}
      boxShadow="base"
      transition="0.2s ease"
      _hover={{
        boxShadow: "md",
        transform: "scale(1.03)",
      }}
    >
      <Flex
        align="center"
        justify="center"
        bg={`${color}20`}
        color={color}
        rounded="md"
        boxSize={10}
        mb={3}
      >
        <Icon as={icon} boxSize={5} />
      </Flex>

      <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1}>
        {label}
      </Text>

      <Text fontSize="2xl" fontWeight="bold" color="gray.800">
        {value}
      </Text>
    </Flex>
  );
};

const IncidentOverview = () => {
  return (
    <Box p={4} bg="blue.50" rounded="md">
      <Text fontSize="md" fontWeight="semibold" mb={4} color="blue.700">
        Incident Overview
      </Text>

      <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={4}>
        {incidentStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default IncidentOverview;
