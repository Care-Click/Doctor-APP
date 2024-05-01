import axios from "axios";
import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

let loca = {};

const Location = ({setLocation}) => {
  const [clickedPosition, setClickedPosition] = useState({longitude:0,latitude:0,place:{city:"",country:""}});
  const LocationMarker = ({ setClickedPosition }) => {
    const handleConvert = async (loca) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${parseFloat(loca.lat)}&lon=${parseFloat(loca.lng)}&format=json&accept-language= fr`
        );

        return response.data.address;
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    const map = useMapEvents({
      click: async (e) => {
        loca = e.latlng;
        let result = await handleConvert(loca);

        if (result) {
          setLocation({
            longitude: e.latlng.lat,
            latitude: e.latlng.lng,
            place: {
              city: result.city,
              country: result.country,
              district: result.county,
            },
          });
          setClickedPosition({
            longitude: e.latlng.lat,
            latitude: e.latlng.lng,
            place: {
              city: result.city,
              country: result.country,
              district: result.county,
            },
          });
          
        }
      },
    });
    return clickedPosition ? (
        <Marker position={[clickedPosition.longitude, clickedPosition.latitude]}>
          <Popup>
            {clickedPosition.place.city}, {clickedPosition.place.country}
          </Popup>
        </Marker>
      ) : null;
    
  };

  return (
    <MapContainer
      center={[35.8245, 10.6346]}
      zoom={13}
      style={{ height: "300px", width: "300px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LocationMarker setClickedPosition={setClickedPosition} />

    </MapContainer>
  );
};
export default Location;
