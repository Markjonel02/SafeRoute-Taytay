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

  const handleSearch = () => {
    const filteredRoutes = ROUTES.filter((r) => r.from === from && r.to === to);

    if (activeTab === "Fastest") {
      filteredRoutes.sort((a, b) => {
        const aMin = parseInt(a.duration);
        const bMin = parseInt(b.duration);
        return aMin - bMin;
      });
    } else {
      filteredRoutes.sort((a, b) => {
        const aCost = parseInt(a.cost.replace("₹", ""));
        const bCost = parseInt(b.cost.replace("₹", ""));
        return aCost - bCost;
      });
    }

    setRoutes(filteredRoutes);
    setSelectedRoute(filteredRoutes[0] || null);
    setSearched(true);
  };

  useEffect(() => {
    if (searched) {
      handleSearch();
    }
  }, [activeTab]);

  useEffect(() => {
    handleSearch();
  }, []);

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
          center={[19.076, 72.8777]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapComponent from={from} to={to} selectedRoute={selectedRoute} />
        </MapContainer>
      </Box>
    </Flex>
  );
}
