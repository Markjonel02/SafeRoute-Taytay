// Get route from OSRM
// Get route from OSRM with traffic data
export const getRouteFromOSRM = async (fromCoords, toCoords) => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${fromCoords.lon},${fromCoords.lat};${toCoords.lon},${toCoords.lat}?overview=full&steps=true&annotations=duration,distance,speed`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const distance = (route.distance / 1000).toFixed(2);
      const duration = Math.round(route.duration / 60);

      // Get step-by-step information for better analysis
      let totalSteps = route.legs[0].steps.length;
      let congestionLevel = "Low"; // Default

      // Estimate traffic based on average speed
      const avgSpeed = (route.distance / route.duration) * 3.6; // Convert m/s to km/h
      if (avgSpeed < 20) {
        congestionLevel = "Heavy";
      } else if (avgSpeed < 40) {
        congestionLevel = "Moderate";
      } else if (avgSpeed < 60) {
        congestionLevel = "Light";
      } else {
        congestionLevel = "Clear";
      }

      const coordinates = route.geometry.coordinates.map(([lon, lat]) => [
        lat,
        lon,
      ]);

      return {
        coordinates,
        distance,
        duration,
        avgSpeed: avgSpeed.toFixed(1),
        congestionLevel,
        steps: totalSteps,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
};
