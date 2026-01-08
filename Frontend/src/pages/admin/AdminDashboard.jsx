import IncidentOverview from "../../components/dashbaord/IncidentOverview";
import IncidentColumnChart from "../../components/charts/IncidentColumnCharts";
import { Box } from "@chakra-ui/react";
const AdminDashboard = () => {
  return (
    <Box p={4}>
      <IncidentOverview />
      <IncidentColumnChart />
    </Box>
  );
};

export default AdminDashboard;
