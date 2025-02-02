import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Replace with your actual Google API Key
const query = "22 Pell Street";
const radius = 5000; // You can adjust the radius as needed (in meters)

// Construct the URL for the Text Search API
const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
  query
)}&radius=${radius}&key=${apiKey}`;

async function fetchPlaceData() {
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      // Log the results or handle them as needed
      console.log("Search Results:", response.data.results);
    } else {
      console.error("Error fetching data:", response.data.error_message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchPlaceData();
