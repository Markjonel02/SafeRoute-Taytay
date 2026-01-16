import React, { useEffect } from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

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

// ============== COMPONENTS ==============

// Map Component with Pan to Location

// Map Component with Route Highlighting

// Map Component with Route Highlighting
const MapComponent = ({
  fromCoords,
  toCoords,
  selectedRoute,
  routeCoordinates,
}) => {
  const map = useMap();

  useEffect(() => {
    if (routeCoordinates && routeCoordinates.length > 0 && selectedRoute) {
      const bounds = L.latLngBounds(routeCoordinates);
      map.fitBounds(bounds, { padding: [80, 80], animate: true, duration: 1 });
    }
  }, [routeCoordinates, selectedRoute, map]);

  return (
    <>
      {/* Route Line - Highlighted when selected */}
      {routeCoordinates && routeCoordinates.length > 0 && selectedRoute && (
        <Polyline
          positions={routeCoordinates}
          color="#6b46c1"
          weight={6}
          opacity={0.9}
          lineCap="round"
          lineJoin="round"
        />
      )}

      {/* From Marker */}
      {fromCoords && (
        <Marker position={[fromCoords.lat, fromCoords.lon]}>
          <Popup>
            <VStack spacing={1}>
              <Text fontWeight="bold">📍 {fromCoords.displayName}</Text>
              <Text fontSize="sm">Departure</Text>
            </VStack>
          </Popup>
        </Marker>
      )}

      {/* To Marker */}
      {toCoords && (
        <Marker position={[toCoords.lat, toCoords.lon]}>
          <Popup>
            <VStack spacing={1}>
              <Text fontWeight="bold">📍 {toCoords.displayName}</Text>
              <Text fontSize="sm">Destination</Text>
            </VStack>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default MapComponent;
