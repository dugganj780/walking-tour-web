import React from "react";
import CreateTourForm from "../components/createTourForm";
import "../App.css";
import "../index.css";
import Grid from "@mui/material/Grid";

const CreateTourPage = () => {
  return (
    <Grid container justify="center">
      <Grid xs={4} />
      <Grid item xs={4} align="center">
        <CreateTourForm />
      </Grid>
      <Grid xs={4} />
    </Grid>
  );
};

export default CreateTourPage;
