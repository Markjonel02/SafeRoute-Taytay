// Route Card Component
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

import { FiMapPin, FiClock, FiDollarSign, FiArrowRight } from "react-icons/fi";
import { LOCATIONS } from "../../utils/Locations";

const RouteCard = ({ route, selected, onSelect }) => {
  const modeIcons = {
    flight: "✈️",
    drive: "🚗",
    railway: "🚂",
    ride: "🚕",
  };

  return (
    <Card
      bg={selected ? "purple.50" : "white"}
      border="2px"
      borderColor={selected ? "purple.600" : "gray.200"}
      mb={3}
      cursor="pointer"
      onClick={onSelect}
      transition="all 0.2s"
      _hover={{ borderColor: "purple.600", shadow: "md" }}
    >
      <CardBody>
        <HStack justify="space-between" mb={3}>
          <HStack spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              {modeIcons[route.mode]}
            </Text>
            <VStack spacing={0} align="start">
              <Text fontWeight="bold" textTransform="uppercase" fontSize="sm">
                {LOCATIONS[route.from].name}
              </Text>
              <Text fontSize="xs" color="gray.600">
                {route.from}
              </Text>
            </VStack>
          </HStack>
          <Icon as={FiArrowRight} color="gray.400" />
          <HStack spacing={2}>
            <VStack spacing={0} align="end">
              <Text fontWeight="bold" textTransform="uppercase" fontSize="sm">
                {LOCATIONS[route.to].name}
              </Text>
              <Text fontSize="xs" color="gray.600">
                {route.to}
              </Text>
            </VStack>
          </HStack>
        </HStack>

        <HStack justify="space-between" spacing={4}>
          <HStack spacing={1} fontSize="sm">
            <Icon as={FiClock} color="purple.600" />
            <VStack spacing={0}>
              <Text fontWeight="bold">{route.duration}</Text>
              <Text fontSize="xs" color="gray.600">
                {route.distance}
              </Text>
            </VStack>
          </HStack>
          <Badge
            bg="purple.600"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
          >
            <HStack spacing={1}>
              <Icon as={FiDollarSign} />
              <Text>{route.cost}</Text>
            </HStack>
          </Badge>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default RouteCard;
