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
  console.log(lat?[parseInt(lon), parseInt(lat)]:center)
  return (
    <div>
      <MapContainer center={lat?[parseInt(lon), parseInt(lat)]:center} zoom={10}   className='h-60 z-0 ' >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={lat?[parseInt(lon), parseInt(lat)]:[center]} icon={customIcon}>
          <Popup>
            {[lat,lon]}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
