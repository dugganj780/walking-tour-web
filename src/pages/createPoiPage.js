import React from "react";
import CreatePoiForm from "../components/createPoiForm";
import "../App.css";
import "../index.css";
import Grid from "@mui/material/Grid";
import NavigationDrawer from "../components/navigationDrawer";

const CreatePoiPage = () => {
  return (
    <>
      <NavigationDrawer title="Create a Destination" />
      <Grid container justify="center">
        <Grid xs={4} />
        <Grid item xs={4} align="center">
          <CreatePoiForm />
        </Grid>
        <Grid xs={4} />
      </Grid>
    </>
  );
};

export default CreatePoiPage;
