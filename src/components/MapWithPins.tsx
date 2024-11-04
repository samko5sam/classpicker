import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapWithPins = ({ center, zoom, pinData }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Initialize the map
  useEffect(() => {
    if (mapRef.current) return; // Ensure map is only initialized once
    
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json", // Demo MapLibre style JSON
      center: center || [0, 0], // Default center if none provided
      zoom: zoom || 2, // Default zoom if none provided
    });

    // Cleanup map on component unmount
    return () => mapRef.current?.remove();
  }, [center, zoom]);

  // Update pins whenever `pinData` changes
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Remove any existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer.type === "symbol") mapRef.current.removeLayer(layer.id);
    });

    // Add new markers based on `pinData`
    pinData.forEach((pin, index) => {
      const marker = new maplibregl.Marker()
        .setLngLat([pin.longitude, pin.latitude])
        .setPopup(new maplibregl.Popup().setHTML(`<h3>${pin.title}</h3><p>${pin.description}</p>`))
        .addTo(mapRef.current);
    });
  }, [pinData]);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default MapWithPins;