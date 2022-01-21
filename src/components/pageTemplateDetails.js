import React, { useState } from "react";
import NavigationDrawer from "./navigationDrawer";
import makeStyles from "@mui/styles/makeStyles";
import TourList from "./tourList";
import Grid from "@mui/material/Grid";
import MapView from "./mapView";

const useStyles = makeStyles({
  root: {
    spacing: 2,
  },
});

function DetailsPageTemplate({ props, title, action }) {
  const classes = useStyles();
  //const [nameFilter, setNameFilter] = useState("");
  //const [genreFilter, setGenreFilter] = useState("0");
  //const genreId = Number(genreFilter);

  return (
    <>
      <NavigationDrawer title={title} />
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <MapView />
        </Grid>
        <Grid item container spacing={5}>
          <TourList action={action} props={props} />
        </Grid>
      </Grid>
    </>
  );
}
export default DetailsPageTemplate;
