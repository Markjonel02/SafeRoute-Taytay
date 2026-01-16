import {
  Box,
  VStack,
  HStack,
  Button,
  Card,
  CardBody,
  Icon,
} from "@chakra-ui/react";

import { FiArrowRight } from "react-icons/fi";

// Search Component

// Search Component
export const SearchSection = ({
  fromText,
  toText,
  setFromText,
  setToText,
  fromSuggestions,
  toSuggestions,
  onSelectFromLocation,
  onSelectToLocation,
  onSearch,
  isLoading,
}) => (
  <Card bg="white" shadow="md" mb={4}>
    <CardBody>
      <VStack spacing={4}>
        <HStack w="full" spacing={3} align="flex-start">
          <LocationSearchInput
            label="From"
            placeholder="Enter departure location..."
            value={fromText}
            suggestions={fromSuggestions}
            onInputChange={setFromText}
            onSelectLocation={onSelectFromLocation}
            isLoading={isLoading}
          />
          <Box mt="27px">
            <Icon as={FiArrowRight} color="gray.400" fontSize="20px" />
          </Box>
          <LocationSearchInput
            label="To"
            placeholder="Enter destination location..."
            value={toText}
            suggestions={toSuggestions}
            onInputChange={setToText}
            onSelectLocation={onSelectToLocation}
            isLoading={isLoading}
          />
        </HStack>
        <Button
          w="full"
          bg="purple.600"
          color="white"
          onClick={onSearch}
          isLoading={isLoading}
          _hover={{ bg: "purple.700" }}
          leftIcon={<FiSearch />}
        >
          {isLoading ? "Searching Routes..." : "Search Routes"}
        </Button>
      </VStack>
    </CardBody>
  </Card>
);
