// pages/api/google-places.ts
import axios from "axios";

const apiKey = "AIzaSyAr6vkUSl02WF0Rttg9Bx1_7y25O78raw8"; // Replace with your actual Google API key
const query = "22 Pell Street"; // The query you're searching for
const radius = 5000; // The search radius in meters

export default async function handler(req, res) {
  // Construct the URL for the Google Places Text Search API
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&radius=${radius}&key=${apiKey}`;

  try {
    // Make the request to Google Places API from the server
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      // Send back the results
      res.status(200).json(response.data.results);
    } else {
      // Handle errors from Google Places API
      res.status(400).json({ error: response.data.error_message });
    }
  } catch (error) {
    // Catch network or other errors
    res.status(500).json({ error: "Network error or something went wrong." });
  }
}
