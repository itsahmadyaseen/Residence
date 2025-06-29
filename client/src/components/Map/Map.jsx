import React from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker'
const Map = ({address, city, country}) => {
  return (
    <MapContainer
  center={[53.35, 18.8]} // Default until geocode loads
  zoom={1}
  scrollWheelZoom={false}
  style={{
    height: "100%",
    minHeight: "300px",
    width: "100%",
    borderRadius: "8px",
  }}
>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
        <GeoCoderMarker address={`${address} ${city} ${country}`} />
    </MapContainer>
  )
}

export default Map