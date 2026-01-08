import {
  Box,
  Flex,
  Text,
  Icon,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

const StatCard = ({ label, value, icon, color, trend }) => {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex
      bg={bg}
      p={4}
      rounded="md"
      border="1px solid"
      borderColor={border}
      align="center"
      justify="space-between"
      boxShadow="base"
      transition="0.2s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "md",
      }}
    >
      {/* Left */}
      <Flex align="center" gap={3} minW={0}>
        <Flex
          boxSize={10}
          align="center"
          justify="center"
          rounded="full"
          bg={`${color}.100`}
          color={`${color}.500`}
          flexShrink={0}
        >
          <Icon as={icon} boxSize={5} />
        </Flex>

        <Box minW={0}>
          {/* Title with truncation + tooltip */}
          <Tooltip label={label} hasArrow>
            <Text
              fontSize="xs"
              color="gray.500"
              fontWeight="medium"
              isTruncated
              maxW={{ base: "80px", md: "120px" }} // smaller width on mobile
            >
              {label}
            </Text>
          </Tooltip>

          {/* Value + trend inline */}
          <Flex align="center" gap={2}>
            <Text fontSize="xl" fontWeight="bold">
              {value}
            </Text>
            {typeof trend === "number" && (
              <Text
                fontSize="xs"
                color={trend > 0 ? "green.500" : "red.500"}
                fontWeight="semibold"
              >
                {trend > 0 ? `+${trend}%` : `${trend}%`}
              </Text>
            )}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default StatCard;
