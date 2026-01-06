import { Box, Skeleton, VStack } from "@chakra-ui/react";

const SidebarSkeleton = ({ collapsed = false }) => {
  return (
    <VStack spacing={4} align="stretch">
      {[...Array(6)].map((_, i) => (
        <Box key={i} display="flex" alignItems="center">
          <Skeleton
            height="20px"
            width="20px"
            borderRadius="md"
            mr={collapsed ? 0 : 3}
          />
          {!collapsed && (
            <Skeleton height="14px" width="120px" borderRadius="md" />
          )}
        </Box>
      ))}
    </VStack>
  );
};

export default SidebarSkeleton;
