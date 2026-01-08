import React from "react";
import { Box } from "@chakra-ui/react";
import UserManagementTable from "../../components/tables/UserManagementTable";
const UserManagement = () => {
  return (
    <Box p={4}>
      <UserManagementTable />
    </Box>
  );
};

export default UserManagement;
