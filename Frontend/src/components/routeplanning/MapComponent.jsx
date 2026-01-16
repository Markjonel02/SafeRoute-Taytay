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
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { FiMapPin, FiClock, FiDollarSign, FiArrowRight } from "react-icons/fi";

// Fix for leaflet default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

import { LOCATIONS } from "../../utils/Locations";
import { ROUTES } from "../../utils/Routes";

// ============== COMPONENTS ==============

// Map Component with Pan to Location
const MapComponent = ({ from, to, selectedRoute, routeCoordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (routeCoordinates && routeCoordinates.length > 0) {
      const bounds = L.latLngBounds(routeCoordinates);
      map.fitBounds(bounds, { padding: [50, 50], animate: true });
    }
  }, [routeCoordinates, map]);

  return (
    <>
      {/* Route Line - Highlighted when selected */}
      {routeCoordinates && routeCoordinates.length > 0 && (
        <Polyline
          positions={routeCoordinates}
          color={selectedRoute ? "#6b46c1" : "#94a3b8"}
          weight={selectedRoute ? 5 : 3}
          opacity={selectedRoute ? 1 : 0.6}
          dashArray={!selectedRoute ? "5, 5" : ""}
        />
      )}

      {/* From Marker */}
      {from && LOCATIONS[from] && (
        <Marker position={LOCATIONS[from].coords}>
          <Popup>
            <VStack spacing={1}>
              <Text fontWeight="bold">📍 {LOCATIONS[from].name}</Text>
              <Text fontSize="sm">Departure</Text>
            </VStack>
          </Popup>
        </Marker>
      )}

      {/* To Marker */}
      {to && LOCATIONS[to] && (
        <Marker position={LOCATIONS[to].coords}>
          <Popup>
            <VStack spacing={1}>
              <Text fontWeight="bold">📍 {LOCATIONS[to].name}</Text>
              <Text fontSize="sm">Destination</Text>
            </VStack>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default MapComponent;
