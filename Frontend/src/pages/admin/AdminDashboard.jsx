import IncidentOverview from "../../components/dashbaord/IncidentOverview";
import { Box } from "@chakra-ui/react";
const AdminDashboard = () => {
  return (
    <Box p={4}>
      <IncidentOverview />
      {/* Add other dashboard widgets below */}
    </Box>
  );
};

export default AdminDashboard;
