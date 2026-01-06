import { Box, Text, IconButton, Flex } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

import Navigations from "./components/navigation/Navigations";
import MainComponent from "./components/MainComponent";
import TestMap from "./tests/TestMap";
import Header from "./components/navigation/Header";

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box display="flex" minH="100vh" w="full" bg="gray.100">
      {/* Sidebar */}
      <Box
        bg="blue.700"
        color="white"
        w={isCollapsed ? "60px" : "220px"}
        minW={isCollapsed ? "60px" : "220px"}
        transition="width 0.3s ease"
        p={4}
        boxShadow="md"
      >
        {/* Sidebar Header */}
        <Flex
          align="center"
          justify={isCollapsed ? "center" : "space-between"}
          mb={6}
        >
          {!isCollapsed && (
            <Text fontSize="lg" fontWeight="bold">
              Navigation
            </Text>
          )}

          <IconButton
            aria-label="Toggle sidebar"
            size="sm"
            variant="ghost"
            colorScheme="whiteAlpha"
            onClick={() => setIsCollapsed((prev) => !prev)}
            icon={isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
          />
        </Flex>

        {/* Navigation */}
        <Navigations isCollapsed={isCollapsed} />
      </Box>

      {/* Main Content */}
      <Box flex="1" display="flex" flexDirection="column">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <Box flex="1" p={4} overflow="auto">
          <MainComponent>
            <Box bg="white" p={6} rounded="md" boxShadow="sm" minH="100%">
              <TestMap />
            </Box>
          </MainComponent>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
