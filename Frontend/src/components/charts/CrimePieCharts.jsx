import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Theft", value: 35 },
  { name: "Assault", value: 20 },
  { name: "Robbery", value: 15 },
  { name: "Vandalism", value: 18 },
  { name: "Fraud", value: 12 },
];

const COLORS = ["#3182CE", "#E53E3E", "#DD6B20", "#38A169", "#805AD5"];

const CrimeTypePieChart = () => {
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={cardBg}
      p={5}
      borderRadius="2xl"
      boxShadow="sm"
      w="100%"
      minH={{ base: "300px", md: "360px" }}
    >
      <Text fontSize="md" fontWeight="semibold" mb={4}>
        Crime Types Distribution
      </Text>

      {/* Chart container MUST have fixed height */}
      <Box w="100%" h={{ base: "240px", md: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="70%"
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend verticalAlign="bottom" align="center" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default CrimeTypePieChart;
