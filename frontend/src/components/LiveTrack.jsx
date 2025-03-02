import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom Marker Icon
const userIcon = new L.Icon({
  iconUrl: "https://openlayers.org/en/latest/examples/data/icon.png",
  iconSize: [35, 35], // Size of the icon
  iconAnchor: [17.5, 17.5], // changed anchor to center the icon exactly
  popupAnchor: [0, -17.5], // adjusted popup position accordingly
});

const defaultCenter = [20.5937, 78.9629]; // Default (India)

// New component: SpotButton for recentering the map
const SpotButton = ({ currentPosition }) => {
  const map = useMap();
  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
      <button onClick={() => map.setView(currentPosition, map.getZoom(), { animate: true })}>
        Spot
      </button>
    </div>
  );
};

const LiveTrack = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("Current position:", lat, lng); // Debug log
        setCurrentPosition([lat, lng]);
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <MapContainer center={currentPosition} zoom={15} style={{ height: "100vh", width: "100vw" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={currentPosition} icon={userIcon} />
      <Recenter position={currentPosition} />
      <SpotButton currentPosition={currentPosition} />
    </MapContainer>
  );
};

// Auto recenters map when user moves
const Recenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);
  return null;
};

export default LiveTrack;
