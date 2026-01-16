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
  Select,
} from "@chakra-ui/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import { FiMapPin, FiClock, FiDollarSign, FiArrowRight } from "react-icons/fi";
import { LOCATIONS } from "../../utils/Locations";
import { ROUTES } from "../../utils/Routes";
// Search Component
const SearchSection = ({ from, to, setFrom, setTo, onSearch, isLoading }) => (
  <Card bg="white" shadow="md" mb={4}>
    <CardBody>
      <VStack spacing={3}>
        <HStack w="full" spacing={2}>
          <Select
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            bg="gray.50"
            border="1px solid"
            borderColor="gray.300"
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 1px purple.500",
            }}
            isDisabled={isLoading}
          >
            {Object.entries(LOCATIONS).map(([code, loc]) => (
              <option key={code} value={code}>
                {loc.name} ({code})
              </option>
            ))}
          </Select>
          <Icon as={FiArrowRight} color="gray.400" />
          <Select
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            bg="gray.50"
            border="1px solid"
            borderColor="gray.300"
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 1px purple.500",
            }}
            isDisabled={isLoading}
          >
            {Object.entries(LOCATIONS).map(([code, loc]) => (
              <option key={code} value={code}>
                {loc.name} ({code})
              </option>
            ))}
          </Select>
        </HStack>
        <Button
          w="full"
          bg="purple.600"
          color="white"
          onClick={onSearch}
          isLoading={isLoading}
          _hover={{ bg: "purple.700" }}
        >
          {isLoading ? "Searching Routes..." : "Search Routes"}
        </Button>
      </VStack>
    </CardBody>
  </Card>
);

export default SearchSection;
