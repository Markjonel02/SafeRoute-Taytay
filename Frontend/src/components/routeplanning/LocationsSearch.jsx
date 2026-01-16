// Location Search Input with Dropdown

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  Badge,
  Text,
  Spinner,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import {
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiArrowRight,
  FiSearch,
} from "react-icons/fi";

export const LocationSearchInput = ({
  label,
  placeholder,
  value,
  suggestions,
  onInputChange,
  onSelectLocation,
  isLoading,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <Box position="relative" flex="1">
      <Text fontSize="sm" fontWeight="bold" mb={1} color="gray.700">
        {label}
      </Text>
      <HStack
        bg="gray.50"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        px={3}
        py={2}
        _focus={{ borderColor: "purple.500" }}
      >
        <Icon as={FiMapPin} color="purple.600" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onInputChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          border="none"
          _focus={{ outline: "none" }}
          isDisabled={isLoading}
        />
        {isLoading && <Spinner size="sm" color="purple.600" />}
      </HStack>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Card
          position="absolute"
          top="100%"
          left="0"
          right="0"
          mt={2}
          shadow="lg"
          zIndex="10"
          maxH="200px"
          overflowY="auto"
        >
          <CardBody p={0}>
            <List spacing={0}>
              {suggestions.map((location, index) => (
                <Box key={index}>
                  <ListItem
                    p={3}
                    cursor="pointer"
                    _hover={{ bg: "purple.50" }}
                    onClick={() => {
                      onSelectLocation(location);
                      setShowSuggestions(false);
                    }}
                  >
                    <HStack spacing={2}>
                      <Icon as={FiMapPin} color="purple.600" />
                      <VStack spacing={0} align="start">
                        <Text fontWeight="bold" fontSize="sm">
                          {location.displayName}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          {location.name}
                        </Text>
                      </VStack>
                    </HStack>
                  </ListItem>
                  {index < suggestions.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};
