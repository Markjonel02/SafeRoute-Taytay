import React, { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Button,
  Text,
  Input,
  Badge,
  VStack,
  HStack,
  Icon,
  Divider,
  Card,
  CardBody,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  Search,
  Plus,
  MapPin,
  AlertCircle,
  User,
  Clock,
  FileText,
  Edit2,
  Phone,
  Mail,
  AlertTriangle,
} from "lucide-react";

// ============================================================================
// DATA & TYPES
// ============================================================================

const MOCK_INCIDENTS = [
  {
    id: "#INC-001",
    severity: "Critical",
    status: "Active",
    title: "Traffic Accident - Route 5",
    reportedDate: "06.05.2023",
    reportedLocation: "Downtown District, NY 12345",
    reportedAddress: "123 Main St",
    expectedResolutionDate: "12.05.2023",
    resolutionLocation: "Downtown District, NY 12345",
    resolutionAddress: "123 Main St",
    reportedBy: "Officer John Smith",
    responders: "Unit Alpha",
    respondersPhone: "+1 555 012 0295",
    respondersEmail: "unit.alpha@police.ny",
    dispatchTime: "12.08.2022, 8:30",
    description:
      "Multi-vehicle collision on Route 5. Clear traffic immediately and establish safety perimeter. Request additional units for scene management.",
    incidentType: "Traffic Accident",
    estimatedAffectedArea: "2 km radius",
  },
  {
    id: "#INC-002",
    severity: "High",
    status: "In Progress",
    title: "Structural Fire - Commercial Building",
    reportedDate: "08.05.2023",
    reportedLocation: "Industrial Zone, NY 12345",
    reportedAddress: "789 Oak Dr",
    expectedResolutionDate: "10.05.2023",
    resolutionLocation: "Industrial Zone, NY 12345",
    resolutionAddress: "789 Oak Dr",
    reportedBy: "Fire Dispatcher",
    responders: "Fire Unit 5",
    respondersPhone: "+1 555 034 5678",
    respondersEmail: "fireunit5@fdny.ny",
    dispatchTime: "08.05.2023, 14:45",
    description:
      "Commercial building fire reported. Evacuate surrounding buildings immediately. Coordinate with emergency medical services.",
    incidentType: "Fire",
    estimatedAffectedArea: "500m radius",
  },
  {
    id: "#INC-003",
    severity: "Medium",
    status: "Pending",
    title: "Road Closure - Maintenance Work",
    reportedDate: "10.05.2023",
    reportedLocation: "Lakeside Avenue, IL 67890",
    reportedAddress: "456 Tanager Drive",
    expectedResolutionDate: "12.05.2023",
    resolutionLocation: "Lakeside Avenue, IL 67890",
    resolutionAddress: "456 Tanager Drive",
    reportedBy: "Street Department",
    responders: "Traffic Control Unit",
    respondersPhone: "+1 555 056 7890",
    respondersEmail: "traffic.control@city.il",
    dispatchTime: "10.05.2023, 06:00",
    description:
      "Scheduled road maintenance. Set up detour routes and place warning signs 500m before closure point.",
    incidentType: "Road Closure",
    estimatedAffectedArea: "1.2 km",
  },
];

// ============================================================================
// MAIN CONTAINER COMPONENT
// ============================================================================

/**
 * IncidentRoutePlanningPage Component
 * Root component orchestrating the incident route planning interface
 * Manages state and layout structure for emergency response coordination
 *
 * Responsibility: Main layout, state management, incident selection
 */
const IncidentRoutePlanningPage = () => {
  const [selectedIncident, setSelectedIncident] = useState(MOCK_INCIDENTS[0]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Flex h="100vh" bg="gray.50">
      {/* Left Sidebar - Incident List */}
      <IncidentListSidebar
        incidents={MOCK_INCIDENTS}
        selectedIncident={selectedIncident}
        onSelectIncident={setSelectedIncident}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <Flex direction="column" flex={1}>
        {/* Header Section */}
        <IncidentPageHeader selectedIncident={selectedIncident} />

        {/* Main Content Grid */}
        <Box flex={1} overflowY="auto" p={6}>
          {/* Top Section - Map and Response Details */}
          <Grid templateColumns="2fr 1fr" gap={6} mb={6}>
            <GridItem>
              <IncidentMapSection selectedIncident={selectedIncident} />
            </GridItem>
            <GridItem>
              <ResponseRouteDetailsPanel selectedIncident={selectedIncident} />
            </GridItem>
          </Grid>

          {/* Bottom Section - Responders, Resources, and Instructions */}
          <Grid templateColumns="1fr 1fr 1fr" gap={6}>
            <GridItem>
              <RespondersSection selectedIncident={selectedIncident} />
            </GridItem>
            <GridItem>
              <ResourcesSection selectedIncident={selectedIncident} />
            </GridItem>
            <GridItem>
              <VStack spacing={6}>
                <AffectedAreaSection selectedIncident={selectedIncident} />
                <DispatchTimeSection selectedIncident={selectedIncident} />
                <IncidentDescriptionSection
                  selectedIncident={selectedIncident}
                />
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Flex>
  );
};
