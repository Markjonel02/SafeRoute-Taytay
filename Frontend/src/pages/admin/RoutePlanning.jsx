import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  VStack,
  Text,
  Image,
  Icon,
  Divider,
  Badge,
  Avatar,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { PhoneIcon, CloseIcon, ChevronRightIcon } from "@chakra-ui/icons";

// Constants
const VEHICLE_TYPES = {
  BIKE: { id: "bike", name: "Bike", icon: "🚲", price: 5.49 },
  STANDARD: { id: "standard", name: "Standard", icon: "🚗", price: 8.99 },
  PREMIUM: { id: "premium", name: "Premium", icon: "🚙", price: 9.49 },
};

// Map Component - SVG based route visualization
const MapContainer = () => {
  return (
    <Box
      w="full"
      bg="gray.200"
      borderRadius="lg"
      overflow="hidden"
      height="320px"
      position="relative"
    >
      <svg width="100%" height="100%" viewBox="0 0 400 500">
        {/* Map background */}
        <rect width="400" height="500" fill="#d1d5db" />

        {/* Grid pattern */}
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
          <linearGradient
            id="routeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#grid)" />

        {/* Street lines */}
        <line
          x1="0"
          y1="200"
          x2="400"
          y2="200"
          stroke="#9ca3af"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="200"
          y1="0"
          x2="200"
          y2="500"
          stroke="#9ca3af"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Route line with gradient */}
        <polyline
          points="80,380 150,300 200,250 280,150 320,80"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Start marker (blue) */}
        <g>
          <circle cx="80" cy="380" r="14" fill="#6366f1" opacity="0.3" />
          <circle cx="80" cy="380" r="10" fill="#6366f1" />
          <circle cx="80" cy="380" r="6" fill="white" />
        </g>

        {/* End marker (purple) */}
        <g>
          <circle cx="320" cy="80" r="14" fill="#a78bfa" opacity="0.3" />
          <circle cx="320" cy="80" r="10" fill="#a78bfa" />
          <circle cx="320" cy="80" r="6" fill="white" />
        </g>

        {/* Distance badge */}
        <g>
          <rect x="280" y="20" width="100" height="35" rx="8" fill="#4f46e5" />
          <text
            x="330"
            y="45"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="bold"
          >
            3 pm
          </text>
        </g>

        {/* Cars on map */}
        <g>
          <rect
            x="150"
            y="280"
            width="20"
            height="12"
            rx="2"
            fill="#6366f1"
            opacity="0.7"
          />
          <rect
            x="60"
            y="320"
            width="20"
            height="12"
            rx="2"
            fill="#6366f1"
            opacity="0.5"
          />
        </g>
      </svg>
    </Box>
  );
};

// Vehicle Selection Component
const VehicleSelector = ({ selected, onSelect }) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="3" mt="4">
      {Object.values(VEHICLE_TYPES).map((vehicle) => (
        <GridItem key={vehicle.id}>
          <Button
            w="full"
            h="auto"
            py="4"
            px="3"
            bg={selected === vehicle.id ? "orange.50" : "white"}
            border="2px solid"
            borderColor={selected === vehicle.id ? "orange.500" : "gray.200"}
            borderRadius="lg"
            _hover={{
              borderColor: selected === vehicle.id ? "orange.500" : "gray.300",
            }}
            onClick={() => onSelect(vehicle.id)}
            display="flex"
            flexDirection="column"
            alignItems="center"
            cursor="pointer"
          >
            <Text fontSize="4xl" mb="2">
              {vehicle.icon}
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="gray.900">
              {vehicle.name}
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="gray.900" mt="1">
              ${vehicle.price.toFixed(2)}
            </Text>
          </Button>
        </GridItem>
      ))}
    </Grid>
  );
};

// Trip Details Component
const TripDetails = () => {
  return (
    <Card mt="4" borderColor="gray.200" borderWidth="1px">
      <CardBody>
        <HStack justify="space-around" spacing="8">
          <VStack spacing="1" align="center">
            <Text fontSize="sm" color="gray.400">
              📍
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="gray.900">
              3.1 km
            </Text>
          </VStack>
          <VStack spacing="1" align="center">
            <Text fontSize="sm" color="gray.400">
              ⏱
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="gray.900">
              8 min
            </Text>
          </VStack>
          <VStack spacing="1" align="center">
            <Text fontSize="sm" color="gray.400">
              💰
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="gray.900">
              $8.92
            </Text>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

// Pickup Location Component
const PickupLocation = () => {
  return (
    <Card mt="4" borderColor="gray.200" borderWidth="1px">
      <CardBody>
        <HStack align="flex-start" spacing="3">
          <Box
            w="10"
            h="10"
            bg="indigo.100"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink="0"
            mt="0.5"
          >
            <Text color="indigo.600">●</Text>
          </Box>
          <VStack align="flex-start" spacing="1">
            <Text fontSize="sm" fontWeight="bold" color="gray.900">
              Where you want to go?
            </Text>
            <Text fontSize="xs" color="gray.500">
              Set your destination
            </Text>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

// Action Buttons Component
const ActionButtons = () => {
  return (
    <HStack gap="3" mt="4">
      <Button
        flex="1"
        rounded="full"
        bg="white"
        borderWidth="2px"
        borderColor="gray.300"
        _hover={{ bg: "gray.50" }}
      >
        <CloseIcon w="5" h="5" color="gray.600" />
      </Button>
      <Button
        flex="1"
        rounded="full"
        bg="orange.500"
        _hover={{ bg: "orange.600" }}
        color="white"
      >
        ✓
      </Button>
      <Button
        flex="1"
        rounded="full"
        bg="indigo.600"
        _hover={{ bg: "indigo.700" }}
      >
        <PhoneIcon w="5" h="5" color="white" />
      </Button>
    </HStack>
  );
};

// Payment Cards Component
const PaymentCards = () => {
  const cards = [
    {
      id: 1,
      name: "Aft Shokir",
      rating: 4.9,
      distance: "350",
      amount: 6.56,
      date: "26 Sep 2020",
      total: 55.0,
    },
    {
      id: 2,
      name: "AR Shokir",
      rating: 4.9,
      distance: "540",
      amount: 3.51,
      date: "12 Aug 2020",
      total: 128.0,
    },
  ];

  return (
    <VStack spacing="3" mt="6">
      {cards.map((card) => (
        <Card key={card.id} w="full" borderColor="gray.200" borderWidth="1px">
          <CardBody>
            <VStack align="flex-start" spacing="2">
              <HStack justify="space-between" w="full">
                <VStack align="flex-start" spacing="1">
                  <Text fontSize="sm" fontWeight="bold" color="gray.900">
                    {card.name}
                  </Text>
                  <HStack spacing="1">
                    <Text fontSize="xs" color="gray.500">
                      ★★★★★
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {card.distance}
                    </Text>
                  </HStack>
                </VStack>
                <VStack align="flex-end" spacing="1">
                  <Text fontSize="sm" fontWeight="bold" color="gray.900">
                    ${card.amount.toFixed(2)}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Paid
                  </Text>
                </VStack>
              </HStack>
              <Divider my="2" />
              <HStack justify="space-between" w="full">
                <Text fontSize="xs" color="gray.500">
                  {card.date}
                </Text>
                <Text fontSize="xs" fontWeight="bold" color="gray.900">
                  ${card.total.toFixed(2)}
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};

// Saved Places Component
const SavedPlaces = () => {
  return (
    <VStack
      align="flex-start"
      spacing="4"
      mt="6"
      pt="4"
      borderTopWidth="1px"
      borderColor="gray.200"
    >
      <HStack justify="space-between" w="full">
        <HStack spacing="2">
          <Text fontSize="lg">📍</Text>
          <Text fontWeight="bold" color="gray.900">
            Saved Places
          </Text>
        </HStack>
        <ChevronRightIcon w="5" h="5" color="gray.400" />
      </HStack>

      <Card w="full" borderColor="gray.200" borderWidth="1px">
        <CardBody>
          <HStack align="flex-start" spacing="3">
            <Box
              w="8"
              h="8"
              bg="gray.200"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink="0"
            >
              <Text fontSize="xs" color="gray.600" fontWeight="bold">
                W
              </Text>
            </Box>
            <VStack align="flex-start" spacing="1">
              <Text fontSize="sm" fontWeight="bold" color="gray.900">
                Work
              </Text>
              <Text fontSize="xs" color="gray.500">
                Studio 08, Joko Simeon
              </Text>
              <Text fontSize="xs" color="gray.400">
                10 min, 28 km
              </Text>
            </VStack>
          </HStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

// Header Component
const Header = () => {
  return (
    <Box borderBottomWidth="1px" borderColor="gray.200" p="4">
      <HStack justify="space-between">
        <HStack spacing="3">
          <Avatar name="JS" bg="orange.500" color="white" size="md" />
          <VStack align="flex-start" spacing="0">
            <Text fontSize="sm" fontWeight="bold" color="gray.900">
              Joe Smith
            </Text>
            <HStack spacing="1">
              <Badge fontSize="xs" bg="transparent" color="orange.500">
                ★ 4.3
              </Badge>
              <Text fontSize="xs" color="gray.500">
                22.4,228.10
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <Button bg="transparent" p="2" _hover={{ bg: "gray.100" }}>
          <CloseIcon w="5" h="5" color="gray.600" />
        </Button>
      </HStack>
    </Box>
  );
};

// Main App Component
export default function RoutePlannerApp() {
  const [selectedVehicle, setSelectedVehicle] = useState("standard");

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="md" bg="white" minH="100vh" overflowY="auto" p="0">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Box p="4">
          {/* Map */}
          <MapContainer />

          {/* Action Buttons */}
          <ActionButtons />

          {/* Trip Details */}
          <TripDetails />

          {/* Where to go */}
          <PickupLocation />

          {/* Vehicle Selection */}
          <Box mt="4">
            <Text fontSize="sm" fontWeight="bold" color="gray.900" mb="2">
              Choose a ride
            </Text>
            <VehicleSelector
              selected={selectedVehicle}
              onSelect={setSelectedVehicle}
            />
          </Box>

          {/* Saved Places */}
          <SavedPlaces />

          {/* Bottom spacing */}
          <Box h="6" />
        </Box>
      </Container>
    </Box>
  );
}
