/**
 * IncidentListItem Component
 * Individual incident list item with severity indicator and timeline
 *
 * Responsibility: Single incident display, selection state, visual hierarchy
 * @param {Object} incident - Incident data object
 * @param {Boolean} isSelected - Is this incident currently selected
 * @param {Function} onSelect - Callback for selection
 */
const IncidentListItem = ({ incident, isSelected, onSelect }) => {
  const getSeverityColor = (severity) => {
    const colorMap = {
      Critical: "red",
      High: "orange",
      Medium: "yellow",
      Low: "green",
    };
    return colorMap[severity] || "gray";
  };

  return (
    <Box
      w="100%"
      p={4}
      borderBottom="1px solid"
      borderColor="gray.100"
      bg={isSelected ? "blue.50" : "white"}
      cursor="pointer"
      onClick={() => onSelect(incident)}
      _hover={{ bg: "gray.50" }}
      transition="background-color 0.2s"
      borderLeft="3px solid"
      borderLeftColor={isSelected ? "blue.500" : "transparent"}
    >
      {/* Header with ID and Severity */}
      <HStack justify="space-between" mb={2}>
        <Text fontSize="sm" fontWeight="bold" color="gray.900">
          {incident.id}
        </Text>
        <Badge
          colorScheme={getSeverityColor(incident.severity)}
          fontSize="xs"
          fontWeight="bold"
        >
          {incident.severity}
        </Badge>
      </HStack>

      {/* Incident Title */}
      <Text fontSize="sm" fontWeight="semibold" color="gray.900" mb={2}>
        {incident.title}
      </Text>

      {/* Timeline */}
      <VStack spacing={2} align="flex-start">
        {/* Reported Location */}
        <HStack spacing={3} w="100%">
          <VStack spacing={1} align="center" flex="0 0 auto">
            <Box w={3} h={3} bg="red.600" borderRadius="full" />
            <Box w={1} h={3} bg="gray.300" />
          </VStack>
          <VStack spacing={0} align="flex-start" flex={1}>
            <Text fontSize="xs" color="gray.500" fontWeight="medium">
              REPORTED
            </Text>
            <Text fontSize="xs" fontWeight="medium" color="gray.900">
              {incident.reportedDate}
            </Text>
            <Text fontSize="xs" color="gray.600" noOfLines={1}>
              {incident.reportedLocation}
            </Text>
          </VStack>
        </HStack>

        {/* Resolution Location */}
        <HStack spacing={3} w="100%">
          <VStack spacing={1} align="center" flex="0 0 auto">
            <Box w={1} h={3} bg="gray.300" />
            <Box w={3} h={3} bg="green.600" borderRadius="full" />
          </VStack>
          <VStack spacing={0} align="flex-start" flex={1}>
            <Text fontSize="xs" color="gray.500" fontWeight="medium">
              TARGET
            </Text>
            <Text fontSize="xs" fontWeight="medium" color="gray.900">
              {incident.expectedResolutionDate}
            </Text>
            <Text fontSize="xs" color="gray.600" noOfLines={1}>
              {incident.resolutionLocation}
            </Text>
          </VStack>
        </HStack>
      </VStack>

      {/* Reporter Info */}
      <HStack
        spacing={2}
        mt={3}
        pt={2}
        borderTop="1px solid"
        borderColor="gray.100"
      >
        <Box as={AlertCircle} size={14} color="gray.400" />
        <Text fontSize="xs" color="gray.600">
          {incident.reportedBy}
        </Text>
      </HStack>
    </Box>
  );
};
