module.exports = async function geocodeAddress(location, country) {
    const address = `${location}, ${country}`;

    const url =
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&limit=1&format=json&apiKey=${process.env.GEOAPIFY_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Geoapify API request failed");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("No location found for this address");
    }

    const result = data.results[0];

    return {
        coordinates: [result.lon, result.lat],
        formattedAddress: result.formatted
    };
};