import React, { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    spacing: 2,
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardaction: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  },
});

export default function CreatePoiForm() {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [owner, setOwner] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);
  const uid = uuidv4();

  const [pois, setPois] = useState([]);

  //const navigate = useNavigate();
  const classes = useStyles();

  async function handleCreateTourClick(e) {
    e.preventDefault();

    console.log(title);
    const poi = {
      uid: uid,
      poi: true,
      title: title,
      owner: owner,
      ownerid: auth.currentUser.uid,
      city: city,
      lat: lat,
      lng: lng,
      image: "",
      recording: "",
    };
    setPois((pois) => {
      return [...pois, poi];
    });

    const poiRef = db.ref("pois");
    poiRef.push(poi);

    console.log(poi);
    setTitle("");
    setCity("");
    setOwner("");
    setLat(0.0);
    setLng(0.0);
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Create a Tour</Typography>
      <Stack spacing={2}>
        <TextField
          id="title"
          label="Title"
          variant="standard"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          id="city"
          label="City"
          variant="standard"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
        />
        <TextField
          id="owner"
          label="Tour Guide"
          variant="standard"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          fullWidth
        />
        <TextField
          id="lat"
          label="Latittude"
          variant="standard"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          fullWidth
        />
        <TextField
          id="lng"
          label="Longitude"
          variant="standard"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleCreateTourClick} fullWidth>
          Create Destination
        </Button>
        <Button variant="contained" fullWidth>
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
}
