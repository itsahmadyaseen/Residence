import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from "esri-leaflet-geocoder";

// setup default marker icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const GeoCoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!address) return;

    ELG.geocode()
      .text(address)
      .run((err, results) => {
        if (err) {
          console.error("Geocoding error:", err);
          return;
        }

        if (results?.results?.length > 0) {
          const { lat, lng } = results.results[0].latlng;
          const newPosition = [lat, lng];
          setPosition(newPosition);
          map.flyTo(newPosition, 14); // ✅ Zoom in closer
        } else {
          console.warn("No geocode results for:", address);
        }
      });
  }, [address, map]);

  return position ? (
    <Marker position={position}>
      <Popup>
        📍 Location for:
        <br />
        <strong>{address}</strong>
      </Popup>
    </Marker>
  ) : null;
};

export default GeoCoderMarker;
