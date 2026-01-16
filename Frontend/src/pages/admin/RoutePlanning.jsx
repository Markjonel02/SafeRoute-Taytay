import { useEffect, useState } from "react";
import { ROUTES } from "../../utils/Routes";

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
import Header from "../../components/routeplanning/Header";
import SearchSection from "../../components/routeplanning/SearchComponent";
import MapComponent from "../../components/routeplanning/MapComponent";
import { FilterTabs } from "../../components/routeplanning/FilterTabs";
import RoutesList from "../../components/routeplanning/RouteList";
export default function RoutePlannerApp() {
  const [from, setFrom] = useState("BOM");
  const [to, setTo] = useState("POO");
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activeTab, setActiveTab] = useState("Fastest");
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const toast = useToast();

  const handleSearch = async () => {
    if (!from || !to) {
      toast({
        title: "Please select both locations",
        status: "warning",
        duration: 3,
        isClosable: true,
      });
      return;
    }

    if (from === to) {
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
      const routeData = await getRouteFromOSRM(from, to);

      if (routeData) {
        setRouteCoordinates(routeData.coordinates);

        // Generate route options based on real data
        const distance = parseFloat(routeData.distance);
        const duration = routeData.duration;

        const generatedRoutes = [
          {
            id: 1,
            from,
            to,
            mode: "drive",
            duration: `${Math.ceil(duration / 60)}h ${duration % 60}m`,
            cost: Math.round(distance * 8),
            distance: distance.toFixed(2),
          },
          {
            id: 2,
            from,
            to,
            mode: "ride",
            duration: `${Math.ceil(duration / 60)}h ${duration % 60}m`,
            cost: Math.round(distance * 12),
            distance: distance.toFixed(2),
          },
          {
            id: 3,
            from,
            to,
            mode: "railway",
            duration: `${Math.ceil((duration / 60) * 1.3)}h ${Math.round(
              (duration % 60) * 1.3
            )}m`,
            cost: Math.round(distance * 2),
            distance: distance.toFixed(2),
          },
          {
            id: 4,
            from,
            to,
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
      } else {
        toast({
          title: "Error fetching routes",
          description: "Unable to calculate route. Please try again.",
          status: "error",
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

  useEffect(() => {
    if (searched) {
      handleSearch();
    }
  }, [activeTab]);

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
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
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
            from={from}
            to={to}
            selectedRoute={selectedRoute}
            routeCoordinates={routeCoordinates}
          />
        </MapContainer>
      </Box>
    </Flex>
  );
}
