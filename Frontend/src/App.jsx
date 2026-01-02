import { Box, Text, IconButton, Flex } from "@chakra-ui/react";
import MainComponent from "./components/MainComponent";
import TestMap from "./tests/TestMap";
import Navigations from "./components/navigation/Navigations";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const ToggleIcon = isCollapsed ? FaArrowRight : FaArrowLeft;

  return (
    <Box display="flex" flexDirection="row" minH="100vh" w="full">
      {/* Navigation Sidebar */}
      <Box
        bg="blue.700"
        color="white"
        p={4}
        transition="all 0.3s ease"
        minW={isCollapsed ? "60px" : "200px"}
        maxW={isCollapsed ? "60px" : "200px"}
      >
        {/* Header row: text + button */}
        <Flex align="center" justify="space-between" mb={4}>
          {!isCollapsed && (
            <Text as="h1" fontSize="xl">
              Navigation
            </Text>
          )}
          <IconButton
            icon={<ToggleIcon />}
            aria-label="Toggle navigation"
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="outline"
            colorScheme="blue"
            
          />
        </Flex>

        {/* Navigation items */}
        <Navigations isCollapsed={isCollapsed} />
      </Box>

      {/* Main Content Area */}
      <Box flex="1" display="flex" flexDirection="column">
        <Box bg="white" p={4} boxShadow="md">
          Header
        </Box>
        <Box flex="1" p={2} bg="gray.50">
          <MainComponent>
            <TestMap />
          </MainComponent>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
