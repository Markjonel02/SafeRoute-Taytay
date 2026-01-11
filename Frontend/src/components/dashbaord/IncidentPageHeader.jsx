// ============================================================================
// HEADER SECTION
// ============================================================================

/**
 * IncidentPageHeader Component
 * Displays page title, incident severity, and action buttons
 *
 * Responsibility: Header UI, incident overview, primary actions
 * @param {Object} selectedIncident - Currently selected incident
 */
const IncidentPageHeader = ({ selectedIncident }) => {
  const getSeverityColor = (severity) => {
    const colorMap = {
      Critical: "red",
      High: "orange",
      Medium: "yellow",
      Low: "green",
    };
    return colorMap[severity] || "gray";
  };

  const getStatusColor = (status) => {
    const colorMap = {
      Active: "red",
      "In Progress": "orange",
      Pending: "yellow",
      Resolved: "green",
    };
    return colorMap[status] || "gray";
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      px={6}
      py={4}
      borderBottom="1px solid"
      borderColor="gray.200"
      bg="white"
    >
      <HStack spacing={4}>
        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft size={20} />}>
          Incidents
        </Button>
        <Divider orientation="vertical" h={6} />
        <VStack spacing={0} align="flex-start">
          <HStack spacing={2}>
            <Text fontSize="lg" fontWeight="bold" color="gray.900">
              {selectedIncident.title}
            </Text>
            <Badge
              colorScheme={getSeverityColor(selectedIncident.severity)}
              fontSize="xs"
            >
              {selectedIncident.severity}
            </Badge>
          </HStack>
          <Text fontSize="xs" color="gray.500">
            {selectedIncident.id}
          </Text>
        </VStack>
      </HStack>

      <HStack spacing={3}>
        <Badge colorScheme={getStatusColor(selectedIncident.status)}>
          {selectedIncident.status}
        </Badge>
        <Button variant="outline" colorScheme="blue" size="sm">
          Update Status
        </Button>
        <Button colorScheme="blue" size="sm">
          Coordinate Response
        </Button>
      </HStack>
    </Flex>
  );
};
