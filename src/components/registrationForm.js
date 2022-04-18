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
import { auth, db, storage } from "../firebase";
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
    //height: "70vh",
    //width: "50%",
    margin: "20px auto",
  },
});

export default function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const uid = auth.currentUser.uid;
  const email = auth.currentUser.email;
  const tourGuide = true;
  const newUserWelcome = true;
  const newUserTour = true;
  const admin = false;
  let tours = [];
  const navigate = useNavigate();

  //const navigate = useNavigate();
  const classes = useStyles();

  async function handleRegisterClick(e) {
    e.preventDefault();
    if (!firstName || !surname) {
      setErrorMessage("Field Missing. Please check your entries and update.");
    } else {
      const user = {
        uid: uid,
        firstName: firstName,
        surname: surname,
        email: email,
        tourGuide: tourGuide,
        admin: admin,
        newUserWelcome: newUserWelcome,
        newUserTour: newUserTour,
        tours: tours,
      };
      console.log(user);

      set(ref(db, `/users/${uid}`), {
        uid: uid,
        firstName: firstName,
        surname: surname,
        email: email,
        tourGuide: tourGuide,
        admin: admin,
        newUserWelcome: newUserWelcome,
        newUserTour: newUserTour,

        tours: tours,
      });

      navigate("/tourlist");
    }
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
      <Typography variant="h5">Complete Registration</Typography>
      <Stack spacing={2}>
        <TextField
          id="firstName"
          label="First Name"
          variant="standard"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
        <TextField
          id="surname"
          label="Surname"
          variant="standard"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
        />
        <Typography color={"red"}>{errorMessage}</Typography>
        <Button variant="contained" onClick={handleRegisterClick} fullWidth>
          Complete Registration
        </Button>
      </Stack>
    </Paper>
  );
}
