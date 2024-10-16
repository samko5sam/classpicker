import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { preDefinedLocations } from "../constants/Locations"
// import L from 'leaflet';

export const MainMap = ({classes}) => {
  // const position = [25.034, 121.564]
  const position1 = preDefinedLocations.filter((a) => {
    return a.name == "校本部"
  })[0]
  const position = [position1.latitude, position1.longitude]
  const zoom = position1.zoom
  console.log(position)
  // const customIcon = new L.Icon({
  //   iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', // URL to your custom icon image
  //   iconSize: [38, 38],
  // });

  return (
    <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} style={{ flex: 1 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {classes.map((event, index) => (
        <Marker
          key={index}
          position={[event.latitude, event.longitude]}
          // icon={customIcon}
        >
          <Popup>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
