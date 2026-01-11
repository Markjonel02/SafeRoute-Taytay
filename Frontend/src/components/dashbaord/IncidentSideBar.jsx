// ============================================================================
// SIDEBAR SECTION - Incident List
// ============================================================================

/**
 * IncidentListSidebar Component
 * Displays list of incidents with filtering and search functionality
 *
 * Responsibility: Incident list display, search, add incident button
 * @param {Array} incidents - List of incident objects
 * @param {Object} selectedIncident - Currently selected incident
 * @param {Function} onSelectIncident - Callback when incident is selected
 * @param {String} searchQuery - Current search query
 * @param {Function} onSearchChange - Callback for search input change
 */
const IncidentListSidebar = ({
  incidents,
  selectedIncident,
  onSelectIncident,
  searchQuery,
  onSearchChange,
}) => {
  const filteredIncidents = incidents.filter(
    (inc) =>
      inc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      w="300px"
      bg="white"
      borderRight="1px solid"
      borderColor="gray.200"
      display="flex"
      flexDir="column"
    >
      {/* Search Section */}
      <Box p={4} borderBottom="1px solid" borderColor="gray.200">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search size={16} color="gray" />
          </InputLeftElement>
          <Input
            placeholder="Search incidents"
            size="sm"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
      </Box>

      {/* Add Incident Button */}
      <Box p={4} borderBottom="1px solid" borderColor="gray.200">
        <Button
          w="100%"
          colorScheme="red"
          variant="light"
          leftIcon={<Plus size={18} />}
          size="sm"
        >
          Report Incident
        </Button>
      </Box>

      {/* Incident List */}
      <VStack spacing={0} flex={1} overflowY="auto">
        {filteredIncidents.map((incident) => (
          <IncidentListItem
            key={incident.id}
            incident={incident}
            isSelected={selectedIncident.id === incident.id}
            onSelect={onSelectIncident}
          />
        ))}
      </VStack>
    </Box>
  );
};


