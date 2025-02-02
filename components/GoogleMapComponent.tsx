// components/GoogleMapComponent.tsx
import React from "react";
import { useEffect, useState } from "react";

// Type for Geocoder results
interface GeocoderResult {
  geometry: {
    location: google.maps.LatLng;
  };
}

const addresses = [
  "1600 Amphitheatre Parkway, Mountain View, CA",
  "22 Pell Street, New York, NY",
  "1 Infinite Loop, Cupertino, CA",
];

const GoogleMapComponent = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loadScript = (src: string) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true); // Set mapLoaded to true when script is loaded
      document.head.appendChild(script);
    };

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
    );
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;

    const geocodeAddresses = async () => {
      const geocoder = new window.google.maps.Geocoder();
      const mapElement = document.getElementById("map");

      if (!mapElement) {
        console.error("Map element not found.");
        return;
      }

      const map = new window.google.maps.Map(mapElement, {
        zoom: 12,
        center: { lat: 37.7749, lng: -122.4194 }, // Default center (San Francisco)
      });

      const markers: google.maps.Marker[] = [];

      for (const address of addresses) {
        try {
          const { results } = await new Promise<{
            results: GeocoderResult[] | null;
          }>((resolve, reject) => {
            geocoder.geocode({ address }, (results, status) => {
              if (status === window.google.maps.GeocoderStatus.OK) {
                resolve({ results });
              } else {
                reject(status);
              }
            });
          });

          if (results && results.length > 0) {
            const { lat, lng } = results[0].geometry.location;

            const marker = new window.google.maps.Marker({
              position: { lat: lat(), lng: lng() },
              map,
              title: address,
            });

            markers.push(marker);
          }
        } catch (error) {
          console.error(
            "Geocoding failed for address:",
            address,
            "Error:",
            error
          );
        }
      }

      if (markers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach((marker) => {
          const position = marker.getPosition();
          if (position) {
            bounds.extend(position);
          }
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds);
        }
      }
    };

    geocodeAddresses();
  }, [mapLoaded]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        id="map"
        style={{
          width: "90%",
          height: "80vh", // Makes the map taller for better visibility
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      />
      {!mapLoaded && <p>Loading map...</p>}
    </div>
  );
};

export default GoogleMapComponent;
