import { useCallback, useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import LoadingIndicator from "./LoadingIndicator";

export type Pin = {
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
};

const MapWithPins = ({ center, zoom, pinData }: {
  center?: number[];
  zoom?: number;
  pinData?: Pin[];
}) => {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: center ? center[0] : 121.5278889480134, // Default longitude
    latitude: center ? center[1] : 25.02665988439874, // Default latitude
    zoom: zoom || 16,
  });

  const stopMapMovement = () => {
    if (mapRef.current) {
      mapRef.current.getMap().stop();
    }
  };

  // Update view state when center or zoom props change
  useEffect(() => {
    stopMapMovement();
    // setViewState((prevState) => ({
    //   ...prevState,
    //   zoom,
    //   longitude: center[0],
    //   latitude: center[1],
    // }));
    if (mapRef.current){
      mapRef.current.easeTo({
        center: center,
        zoom: zoom || 16,
        speed: 10,         // Animation speed; smaller values make slower transitions
        curve: 1,        // Controls the curvature of the flight path
        easing: (t) => t,   // Linear easing; change to create different transition effects
        essential: true     // Ensures that the transition runs smoothly
      });
    }
  }, [center, zoom]);

  const handleMarkerClick = useCallback((marker) => {
    setSelectedMarker(marker);
  }, []);

  return (
    <>
      <LoadingIndicator isShown={loading} />
      <Map
        {...viewState}
        ref={mapRef}
        onMove={(evt) => {
          setViewState(evt.viewState)
        }}
        style={{ flex: 1 }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        onLoad={() => setLoading(false)}
      >
        {/* Render markers based on pinData */}
        {pinData && pinData.map((pin, index) => (
          <Marker onClick={() => handleMarkerClick(pin)} key={index} latitude={pin.latitude} longitude={pin.longitude}>
            <div style={{ backgroundColor: "red", width: "10px", height: "10px", borderRadius: "50%" }} />
            <div style={{ color: "black", backgroundColor: "white", padding: "2px", borderRadius: "3px" }}>
              <strong>{pin.title}</strong>
              <p>{pin.description}</p>
            </div>
          </Marker>
        ))}

        {selectedMarker && (
          <Popup
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
            onClose={() => setSelectedMarker(null)}
            closeOnClick={false} // Keeps popup open on map clicks outside of it
          >
            <div style={{ padding: "5px", maxWidth: "200px" }}>
              <h3>{selectedMarker.title}</h3>
              <p>{selectedMarker.description}</p>
              {selectedMarker.image && (
                <img
                  src={selectedMarker.image}
                  alt={selectedMarker.title}
                  style={{ width: "100%", borderRadius: "4px" }}
                />
              )}
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
};

export default MapWithPins;
