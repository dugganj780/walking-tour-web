import { makeStyles } from "@mui/styles";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import Card from "@mui/material/Card";
import React, { useState, useEffect } from "react";
import MediaPlayer from "./mediaPlayer";
import { Typography } from "@mui/material";
import { db } from "../firebase";

const useStyles = makeStyles({
  map: {
    width: "100%",
    height: "100%",
  },
  card: {
    width: "100%",
    height: "90vh",
    margin: "10px",
  },
});

function MapViewTour(props) {
  const { uid, title, lat, lng, pois } = props.props.props;
  const classes = useStyles();
  const [activePoi, setActivePoi] = useState(null);
  const [foundPois, setFoundPois] = useState([]);

  useEffect(() => {
    const getPois = async () => {
      const poiRef = db.ref("pois");
      poiRef.on("value", (snapshot) => {
        const poi = snapshot.val();
        const dbPois = [];
        console.log(pois);
        const keys = Object.keys(pois);
        console.log(keys);
        for (let id in poi) {
          keys.forEach((key, index) => {
            if (key === id) {
              console.log(key);
              dbPois.push(poi[id]);
              console.log(dbPois);
            }
          });
        }
        console.log(dbPois);
        setFoundPois(dbPois);
        console.log(foundPois[0].lat);
      });
    };
    getPois();
  }, []);

  function handleClick(props) {
    setActivePoi(props);
    console.log(activePoi);
  }

  return (
    <Card className={classes.card}>
      {foundPois[0] && (
        <MapContainer
          className={classes.map}
          center={[parseFloat(foundPois[0].lat), parseFloat(foundPois[0].lng)]}
          zoom={20}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {foundPois.map((poi) => {
            console.log(poi.lat);
            return (
              <>
                <Marker
                  key={poi.uid}
                  position={[poi.lat, poi.lng]}
                  eventHandlers={{
                    click: (e) => {
                      console.log(poi);
                      console.log("marker clicked", e);
                      handleClick(poi);
                      console.log(activePoi);
                    },
                  }}
                />
                ;
              </>
            );
          })}
          {activePoi && (
            <Popup
              position={[activePoi.lat, activePoi.lng]}
              onClose={() => {
                setActivePoi(null);
              }}
            >
              <>
                <Typography>{activePoi.title}</Typography>
              </>
            </Popup>
          )}
        </MapContainer>
      )}
    </Card>
  );
}

export default MapViewTour;
