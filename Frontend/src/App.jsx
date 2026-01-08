import {
  Box,
  Text,
  IconButton,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// 🔹 Lazy-loaded components
const Navigations = lazy(() => import("./components/navigation/Navigations"));
const MainComponent = lazy(() => import("./components/MainComponent"));
const Header = lazy(() => import("./components/navigation/Header"));

// 🔹 Lazy-loaded pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const RoutePlanning = lazy(() => import("./pages/admin/RoutePlanning"));
const VehicleTracking = lazy(() => import("./pages/admin/VehicleTracking"));
const PerformanceReports = lazy(() =>
  import("./pages/admin/PerformanceReports")
);
const Settings = lazy(() => import("./pages/admin/Settings"));
const SystemLogs = lazy(() => import("./pages/admin/SystemLogs"));
const TestMap = lazy(() => import("./tests/TestMap"));

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Theme-aware colors
  const sidebarBg = useColorModeValue("white", "blue.600");
  const sidebarColor = useColorModeValue("white", "gray.100");

  return (
    <Box
      display="flex"
      minH="100vh"
      w="full"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      {/* Sidebar */}
      <Box
        bg={sidebarBg}
        color={sidebarColor}
        w={isCollapsed ? "80px" : "220px"}
        minW={isCollapsed ? "80px" : "220px"}
        transition="width 0.3s ease"
        p={4}
        boxShadow="sm"
      >
        {/* Sidebar Header */}
        <Flex
          align="center"
          justify={isCollapsed ? "center" : "space-between"}
          mb={6}
        >
          {!isCollapsed && (
            <Text fontSize="lg" fontWeight="bold" color={"blue.500"}>
              Navigation
            </Text>
          )}
          <IconButton
            aria-label="Toggle sidebar"
            size="sm"
            variant="solid" // ✅ use a valid variant
            colorScheme="blue" // ✅ sets the color theme
            onClick={() => setIsCollapsed((prev) => !prev)}
            icon={isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
          />
        </Flex>

        {/* Navigation */}
        <Suspense fallback={<Text>Loading navigation...</Text>}>
          <Navigations isCollapsed={isCollapsed} />
        </Suspense>
      </Box>

      {/* Main Content */}
      <Box flex="1" display="flex" flexDirection="column" bg="#edf4fa">
        {/* Header */}
        <Suspense fallback={<Box p={4}>Loading header...</Box>}>
          <Header />
        </Suspense>

        {/* Page Content */}
        <Box flex="1" p={4} overflow="auto">
          <Suspense fallback={<Box p={4}>Loading page...</Box>}>
            <MainComponent>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/route-planning" element={<RoutePlanning />} />
                <Route path="/vehicle-tracking" element={<VehicleTracking />} />
                <Route
                  path="/performance-reports"
                  element={<PerformanceReports />}
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="/system-logs" element={<SystemLogs />} />
                <Route path="/test-map" element={<TestMap />} />
              </Routes>
            </MainComponent>
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
