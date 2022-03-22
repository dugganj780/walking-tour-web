import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { db } from "../firebase";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    width: "100%",
    margin: "10px",
  },
});

export default function PoiList(props) {
  const { uid, pois } = props.props;
  const [activePoi, setActivePoi] = useState(null);
  const [foundPois, setFoundPois] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();

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
      });
    };
    getPois();
  }, []);

  async function handleRemovePoi(id) {
    const tourId = uid;
    console.log(tourId);

    const tourRef = db.ref("tours");
    tourRef.once("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            // The ID is the key
            console.log(uid);
            // The Object is foo[key]
            console.log(tours[uid]);
            //const tourPoiRef = db.ref(`tours/${uid}/pois`);
            db.ref(`/tours/${uid}/pois/${id}`).remove();
            navigate(0);
            //navigate("/tourlist");
          } else {
            console.log("Could not delete tour");
          }
        });
      }
    });
  }

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">Tour Destinations</Typography>
          {!foundPois && (
            <Typography variant="h4">No destinations available.</Typography>
          )}
          {foundPois[0] && (
            <List>
              {foundPois.map((poi) => {
                return (
                  <ListItem
                    key={poi.uid}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => handleRemovePoi(poi.uid)} />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt={poi.title} src={poi.image} />
                    </ListItemAvatar>
                    <ListItemText primary={poi.title} secondary={poi.city} />
                  </ListItem>
                );
              })}
            </List>
          )}
        </CardContent>
      </Card>
    </>
  );
}
