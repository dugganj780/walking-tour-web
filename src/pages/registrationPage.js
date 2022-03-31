import React from "react";
import logo from "../logo.svg";
import "../App.css";
import "../index.css";
import Grid from "@mui/material/Grid";
import RegistrationForm from "../components/registrationForm";

const RegistrationPage = () => {
  return (
    <Grid container justify="center">
      <Grid xs={4} />
      <Grid item xs={4} align="center">
        <RegistrationForm />
      </Grid>
      <Grid xs={4} />
    </Grid>
  );
};

export default RegistrationPage;
