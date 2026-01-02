import { Box } from "@chakra-ui/react";
import MainComponent from "./components/MainComponent";
import TestMap from "./tests/TestMap";

const App = () => {
  return (
    <Box display="flex" flexDirection="row" minH="100vh" w="full">
      {/* Navigation Sidebar */}
      <Box bg="blue.700" color="white" minW="200px" p={4}>
        Navigation
      </Box>

      {/* Main Content Area */}
      <Box flex="1" display="flex" flexDirection="column">
        {/* Header */}
        <Box bg="white" p={4} boxShadow="md">
          Header
        </Box>

        {/* Main Container */}
        <Box flex="1" p={4} bg="gray.50">
          <MainComponent>
            <TestMap />
          </MainComponent>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
