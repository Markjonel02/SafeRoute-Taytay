import { Badge } from "@chakra-ui/react";
export const TrafficStatus = ({ level }) => {
  const colors = {
    Clear: { bg: "green.100", color: "green.700" },
    Light: { bg: "blue.100", color: "blue.700" },
    Moderate: { bg: "yellow.100", color: "yellow.700" },
    Heavy: { bg: "red.100", color: "red.700" },
  };

  const config = colors[level] || colors.Light;

  return (
    <Badge
      bg={config.bg}
      color={config.color}
      px={2}
      py={1}
      borderRadius="full"
      fontSize="xs"
    >
      🚦 {level} Traffic
    </Badge>
  );
};
