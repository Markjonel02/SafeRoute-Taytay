import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const IncidentColumnChart = () => {
  const bg = useColorModeValue("white", "gray.800");
  const gridColor = useColorModeValue("#E2E8F0", "#2D3748");
  const labelColor = useColorModeValue("#4A5568", "#A0AEC0");

  const data = {
    labels: ["Accidents", "Crimes", "New", "Resolved", "Escalated"],
    datasets: [
      {
        label: "Incidents",
        data: [120, 80, 45, 100, 15],
        backgroundColor: [
          "#E53E3E",
          "#DD6B20",
          "#D69E2E",
          "#38A169",
          "#805AD5",
        ],
        borderRadius: 12,
        barThickness: 36,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1A202C",
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: labelColor,
          font: { size: 12 },
        },
      },
      y: {
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          color: labelColor,
          font: { size: 12 },
        },
      },
    },
    animation: {
      duration: 900,
      easing: "easeOutQuart",
    },
  };

  return (
    <Box bg={bg} p={6} rounded="lg" boxShadow="sm">
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        Incident Statistics
      </Text>

      <Box h="300px">
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default IncidentColumnChart;
