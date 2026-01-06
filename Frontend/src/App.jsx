import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import Navigations from "./components/navigation/Navigations";
import MainComponent from "./components/MainComponent";
import testMap from "./tests/TestMap";
const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const ToggleIcon = isCollapsed ? FaArrowRight : FaArrowLeft;

  return (
    <Box display="flex" flexDirection="row" minH="100vh" w="full">
      {/* Navigation Sidebar */}
      <Box
        bg="blue.700"
        color="white"
        minW={isCollapsed ? "60px" : "200px"}
        p={4}
        transition="min-width 0.3s ease"
        display="flex"
        flexDirection="column"
        boxShadow="md"
      >
        {/* Header row: Navigation text + Toggle button */}
        <Flex align="center" justify="space-between" mb={6}>
          {!isCollapsed && (
            <Text as="h1" fontSize="xl" fontWeight="bold">
              Navigation
            </Text>
          )}
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            bg="blue.600"
            _hover={{ bg: "blue.500" }}
            color="white"
            size="sm"
            p={2}
          >
            <ToggleIcon />
          </Button>
        </Flex>

        {/* Navigation Items (always render, icons-only when collapsed) */}
        <Navigations isCollapsed={isCollapsed} />
      </Box>

      {/* Main Content Area */}
      <Box flex="1" display="flex" flexDirection="column">
        {/* Header */}
        <Box bg="white" p={4} boxShadow="md">
          <Text fontSize="lg" fontWeight="bold">
            Header
          </Text>
        </Box>

        {/* Main Container */}
        <MainComponent>
          <Box flex="1" bg="gray.50" overflowY="auto" rounded="sm">
            <Box bg="white" p={6} rounded="md" boxShadow="sm" minH="100%">
              {/* Replace the below with actual main content */}

              {testMap()}
            </Box>
          </Box>
        </MainComponent>
      </Box>
    </Box>
  );
};

export default App;
