import React from "react";
import logo from "../logo.svg";
import LoginForm from "../components/loginForm";
import "../App.css";
import "../index.css";
import Grid from "@mui/material/Grid";
import WelcomeCard from "../components/welcomeCard";

const HomePage = () => {
  return (
    <Grid container>
      <Grid xs={1} />

      <Grid item xs={4}>
        <WelcomeCard />
      </Grid>
      <Grid xs={2} />

      <Grid item xs={4} align="center">
        <LoginForm />
      </Grid>
      <Grid xs={1} />
    </Grid>
  );
};

export default HomePage;
