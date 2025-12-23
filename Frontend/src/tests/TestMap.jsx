import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const testMap = () => {
  return (
    <MapContainer
      center={[14.5995, 120.9842]} // Manila coordinates
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      {" "}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />{" "}
      <Marker position={[14.5995, 120.9842]}>
        {" "}
        <Popup> 📍 You are in Manila! </Popup>{" "}
      </Marker>{" "}
    </MapContainer>
  );
};

export default testMap;
