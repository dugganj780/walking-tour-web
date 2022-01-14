import React from "react";
import logo from "../logo.svg";
import LoginForm from "../components/loginForm";
import "../App.css";
import "../index.css";
import Grid from "@mui/material/Grid";

const HomePage = () => {
  return (
    <Grid container justify="center">
      <Grid xs={4} />
      <Grid item xs={4} align="center">
        <LoginForm />
      </Grid>
      <Grid xs={4} />
    </Grid>
  );
};

export default HomePage;
