// Nominatim API for location search

export const searchLocations = async (query) => {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&limit=5`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await response.json();
    return data.map((item) => ({
      name: item.name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      displayName: item.display_name.split(",")[0],
    }));
  } catch (error) {
    console.error("Error searching locations:", error);
    return [];
  }
};
