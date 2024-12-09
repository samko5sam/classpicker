import { useCallback, useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import LoadingIndicator from "./LoadingIndicator";

export type Pin = {
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
  type?: string;
  中文課程名稱?: string;
};

const MapWithPins = ({ center, zoom, pinData, showAllPopup }: {
  center?: number[];
  zoom?: number;
  pinData?: Pin[];
  showAllPopup?: boolean;
}) => {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: center ? center[0] : 121.5278889480134, // Default longitude
    latitude: center ? center[1] : 25.02665988439874, // Default latitude
    zoom: zoom || 16,
  });

  // console.log(pinData)

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
            {pin.type !== "area" && <>
              <div className="flex flex-col items-center">
                {showAllPopup && (pin.中文課程名稱 && <p className="text-base">{pin.中文課程名稱.replace(/(?:\[.*?\]|\(.*?\))/g, '')}</p>)}
                <div style={{ backgroundColor: "red", width: "20px", height: "20px", borderRadius: "50%", borderWidth: "1px", borderColor: "black" }} />
                {showAllPopup && (pin.中文課程名稱 && <p className="text-base opacity-0">{pin.中文課程名稱.replace(/(?:\[.*?\]|\(.*?\))/g, '')}</p>)}
              </div>
            </>}
            {pin.type === "area" && <div style={{ color: "black", backgroundColor: "white", padding: "2px", borderRadius: "3px", borderWidth: "1px", borderColor: "black" }}>
              <strong>{pin.title}</strong>
              <p>{pin.description}</p>
            </div>}
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
              {selectedMarker.中文課程名稱 && <p className="text-xl">{selectedMarker.中文課程名稱.replace(/(?:\[.*?\]|\(.*?\))/g, '')}</p>}
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
