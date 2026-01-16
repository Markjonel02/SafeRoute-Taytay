import { useEffect, useState } from "react";
import { ROUTES } from "../../utils/Routes";

import { Box, VStack, Flex, useToast } from "@chakra-ui/react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";

import Header from "../../components/routeplanning/Header";
import SearchSection from "../../components/routeplanning/SearchComponent";
import MapComponent from "../../components/routeplanning/MapComponent";
import { FilterTabs } from "../../components/routeplanning/FilterTabs";
import RoutesList from "../../components/routeplanning/RouteList";
import { searchLocations } from "../../services/searchLocations";
import { getRouteFromOSRM } from "../../services/getRouteOSRM";
import SearhComponent

export default function RoutePlannerApp() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activeTab, setActiveTab] = useState("Fastest");
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const toast = useToast();

  // Real-time search for "From" location
  useEffect(() => {
    const timer = setTimeout(() => {
      if (fromText.length > 0) {
        searchLocations(fromText).then(setFromSuggestions);
      } else {
        setFromSuggestions([]);
      }
    }, 300); // Debounce 300ms

    return () => clearTimeout(timer);
  }, [fromText]);

  // Real-time search for "To" location
  useEffect(() => {
    const timer = setTimeout(() => {
      if (toText.length > 0) {
        searchLocations(toText).then(setToSuggestions);
      } else {
        setToSuggestions([]);
      }
    }, 300); // Debounce 300ms

    return () => clearTimeout(timer);
  }, [toText]);

  const handleSelectFromLocation = (location) => {
    setFromCoords(location);
    setFromText(location.displayName);
    setFromSuggestions([]);
  };

  const handleSelectToLocation = (location) => {
    setToCoords(location);
    setToText(location.displayName);
    setToSuggestions([]);
  };

  const handleSearch = async () => {
    if (!fromCoords || !toCoords) {
      toast({
        title: "Please select both locations",
        status: "warning",
        duration: 3,
        isClosable: true,
      });
      return;
    }

    if (fromCoords.lat === toCoords.lat && fromCoords.lon === toCoords.lon) {
      toast({
        title: "Please select different locations",
        status: "warning",
        duration: 3,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Fetch real route data
      const routeData = await getRouteFromOSRM(fromCoords, toCoords);

      if (routeData) {
        setRouteCoordinates(routeData.coordinates);

        // Generate route options based on real data
        const distance = parseFloat(routeData.distance);
        const duration = routeData.duration;

        const generatedRoutes = [
          {
            id: 1,
            fromName: fromCoords.displayName,
            toName: toCoords.displayName,
            mode: "drive",
            duration: `${Math.ceil(duration / 60)}h ${duration % 60}m`,
            cost: Math.round(distance * 8),
            distance: distance.toFixed(2),
          },
          {
            id: 2,
            fromName: fromCoords.displayName,
            toName: toCoords.displayName,
            mode: "ride",
            duration: `${Math.ceil(duration / 60)}h ${duration % 60}m`,
            cost: Math.round(distance * 12),
            distance: distance.toFixed(2),
          },
          {
            id: 3,
            fromName: fromCoords.displayName,
            toName: toCoords.displayName,
            mode: "railway",
            duration: `${Math.ceil((duration / 60) * 1.3)}h ${Math.round(
              (duration % 60) * 1.3
            )}m`,
            cost: Math.round(distance * 2),
            distance: distance.toFixed(2),
          },
          {
            id: 4,
            fromName: fromCoords.displayName,
            toName: toCoords.displayName,
            mode: "flight",
            duration: `${Math.ceil((duration / 60) * 0.3)}h ${Math.round(
              (duration % 60) * 0.3
            )}m`,
            cost: Math.round(distance * 15),
            distance: distance.toFixed(2),
          },
        ];

        // Sort by selected tab
        let sortedRoutes = [...generatedRoutes];
        if (activeTab === "Fastest") {
          sortedRoutes.sort((a, b) => {
            const aMin = parseInt(a.duration);
            const bMin = parseInt(b.duration);
            return aMin - bMin;
          });
        } else {
          sortedRoutes.sort((a, b) => a.cost - b.cost);
        }

        setRoutes(sortedRoutes);
        setSelectedRoute(sortedRoutes[0]);
        setSearched(true);

        toast({
          title: "Routes found!",
          description: `Found ${sortedRoutes.length} route options`,
          status: "success",
          duration: 3,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: "Failed to search routes",
        status: "error",
        duration: 3,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex h="100vh" bg="gray.100">
      {/* Left Panel */}
      <Box
        w={{ base: "100%", md: "35%" }}
        bg="gray.50"
        p={4}
        overflowY="auto"
        boxShadow="lg"
      >
        <VStack spacing={4} align="stretch">
          <Header />
          <SearchSection
            fromText={fromText}
            toText={toText}
            setFromText={setFromText}
            setToText={setToText}
            fromSuggestions={fromSuggestions}
            toSuggestions={toSuggestions}
            onSelectFromLocation={handleSelectFromLocation}
            onSelectToLocation={handleSelectToLocation}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          {searched && (
            <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
          {searched && (
            <RoutesList
              routes={routes}
              selectedRoute={selectedRoute}
              onSelectRoute={setSelectedRoute}
            />
          )}
        </VStack>
      </Box>

      {/* Right Panel - Map */}
      <Box
        w={{ base: "0%", md: "65%" }}
        display={{ base: "none", md: "block" }}
        position="relative"
      >
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapComponent
            fromCoords={fromCoords}
            toCoords={toCoords}
            selectedRoute={selectedRoute}
            routeCoordinates={routeCoordinates}
          />
        </MapContainer>
      </Box>
    </Flex>
  );
}
