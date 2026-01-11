import IncidentOverview from "../../components/dashbaord/IncidentOverview";
import IncidentColumnChart from "../../components/charts/IncidentColumnCharts";
import { Box } from "@chakra-ui/react";
import RecentActivitiesTable from "../../components/dashbaord/RecentActivities";
const AdminDashboard = () => {
  return (
    <Box p={4}>
      <IncidentOverview />
      <IncidentColumnChart />
      
      <RecentActivitiesTable />
    </Box>
  );
};

export default AdminDashboard;
