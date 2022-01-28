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
import { db, storage } from "../firebase";
import { set, ref } from "firebase/database";
import { ref as sRef } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

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

export default function CreateTourForm() {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [owner, setOwner] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const uid = uuidv4();

  let pois = [];
  const [tours, setTours] = useState([]);

  //const navigate = useNavigate();
  const classes = useStyles();

  const uploadHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  function uploadFiles(file) {
    if (!file) return;

    const storageRef = sRef(storage, `tourImages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImage(url);
        });
      }
    );
  }

  async function handleCreateTourClick(e) {
    e.preventDefault();

    const tour = {
      uid: uid,
      title: title,
      city: city,
      country: country,
      owner: owner,
      image: image,
      pois: pois,
    };
    console.log(tour);
    console.log(image);
    setTours((tours) => {
      return [...tours, tour];
    });

    /*
    const tourRef = db.ref("tours");
    tourRef.push(tour);
    */

    set(ref(db, `/tours/${uid}`), {
      uid: uid,
      title: title,
      city: city,
      country: country,
      owner: owner,
      image: image,
      pois: pois,
    });

    setImage("");
    setTitle("");
    setCity("");
    setCountry("");
    setOwner("");
  }

  /*
  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email.current.value, password.current.value);
      navigate("/tourlist");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }
  */

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
          id="country"
          label="Country"
          variant="standard"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
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
        <Button variant="contained" onClick={handleCreateTourClick} fullWidth>
          Create Tour
        </Button>
        <Button variant="contained" fullWidth>
          Cancel
        </Button>
        <form onSubmit={uploadHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload Image</button>
        </form>
      </Stack>
    </Paper>
  );
}
