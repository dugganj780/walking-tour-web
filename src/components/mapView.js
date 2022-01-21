import { makeStyles } from "@mui/styles";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import Card from "@mui/material/Card";
import React from "react";

const useStyles = makeStyles({
  map: {
    width: "100%",
    height: "50vh",
  },
  card: {
    //width: "100%",
    height: "50vh",
    margin: "10px",
  },
});

function MapView() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <MapContainer
        className={classes.map}
        center={[51.890826795003676, -8.481695988427454]}
        zoom={20}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </Card>
  );
}

export default MapView;
