/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import map from 'E:/mern-estate/public/map.png'


export default function Map({lat,lon}) {
  const customIcon = new Icon ({
    iconUrl:map,
    iconSize:[38,38]
  }) 
  const center = [51.505, -0.09]

  return (
    <div>
      <MapContainer center={[parseInt(lon), parseInt(lat)]} zoom={13}   className='h-72 max-w-lg' >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[parseInt(lon), parseInt(lat)]} icon={customIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
