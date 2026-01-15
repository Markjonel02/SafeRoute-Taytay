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
const MapComponent = ({ from, to, selectedRoute }) => {
  const map = useMap();
  const [route, setRoute] = useState(null);

  useEffect(() => {
    if (from && to && selectedRoute) {
      const fromCoords = LOCATIONS[from]?.coords;
      const toCoords = LOCATIONS[to]?.coords;

      if (fromCoords && toCoords) {
        setRoute([fromCoords, toCoords]);

        const bounds = L.latLngBounds([fromCoords, toCoords]);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [from, to, selectedRoute, map]);

  return (
    <>
      {route && (
        <Polyline positions={route} color="#6b46c1" weight={3} opacity={0.8} />
      )}
      {from && LOCATIONS[from] && (
        <Marker position={LOCATIONS[from].coords}>
          <Popup>{LOCATIONS[from].name}</Popup>
        </Marker>
      )}
      {to && LOCATIONS[to] && (
        <Marker position={LOCATIONS[to].coords}>
          <Popup>{LOCATIONS[to].name}</Popup>
        </Marker>
      )}
    </>
  );
};

export default MapComponent;
