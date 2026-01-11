import IncidentOverview from "../../components/dashbaord/IncidentOverview";
import IncidentColumnChart from "../../components/charts/IncidentColumnCharts";
import RecentActivitiesTable from "../../components/dashbaord/RecentActivities";
import CrimeTypePieChart from "../../components/charts/CrimePieCharts";

import { Box, VStack, SimpleGrid } from "@chakra-ui/react";

const AdminDashboard = () => {
  return (
    <Box p={{ base: 4, md: 6 }}>
      <VStack spacing={6} align="stretch">
        {/* Overview cards */}
        <IncidentOverview />

        {/* Charts Row */}
        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={6}
          alignItems="stretch"
        >
          {/* Incident Column Chart (wider) */}
          <Box gridColumn={{ base: "auto", lg: "span 2" }}>
            <IncidentColumnChart />
          </Box>

          {/* Crime Type Pie Chart */}
          <CrimeTypePieChart/>
        </SimpleGrid>

        {/* Recent activities */}
        <RecentActivitiesTable />
      </VStack>
    </Box>
  );
};

export default AdminDashboard;
