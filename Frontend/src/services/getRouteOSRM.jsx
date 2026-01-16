// Get route from OSRM
export const getRouteFromOSRM = async (fromCoords, toCoords) => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${fromCoords.lon},${fromCoords.lat};${toCoords.lon},${toCoords.lat}?overview=full&steps=true`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const distance = (route.distance / 1000).toFixed(2);
      const duration = Math.round(route.duration / 60);

      const coordinates = route.geometry.coordinates.map(([lon, lat]) => [
        lat,
        lon,
      ]);

      return {
        coordinates,
        distance,
        duration,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
};
