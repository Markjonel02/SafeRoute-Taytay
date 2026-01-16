import { HStack, Button } from "@chakra-ui/react";

// Filter Tabs Component
// Filter Tabs Component
export const FilterTabs = ({ activeTab, setActiveTab }) => (
  <HStack spacing={2} mb={4} w="full">
    {["Fastest", "Cheapest"].map((tab) => (
      <Button
        key={tab}
        size="sm"
        w="50%"
        bg={activeTab === tab ? "purple.600" : "gray.200"}
        color={activeTab === tab ? "white" : "gray.700"}
        onClick={() => setActiveTab(tab)}
        _hover={{ bg: activeTab === tab ? "purple.700" : "gray.300" }}
      >
        {tab}
      </Button>
    ))}
  </HStack>
);
