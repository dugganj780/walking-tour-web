import React, { useState } from "react";
import NavigationDrawer from "./navigationDrawer";
import Grid from "@mui/material/Grid";
import MapViewPoi from "./mapViewPoi";
import MapViewTour from "./mapViewTour";
import DetailsCard from "./detailsCard";

function DetailsPageTemplate({ props, title, action }) {
  const { poi } = props;
  console.log(props);

  function UsableMap(props) {
    console.log(props);
    if (poi) {
      return <MapViewPoi props={props} />;
    } else {
      return <MapViewTour props={props} />;
    }
  }
  //const [nameFilter, setNameFilter] = useState("");
  //const [genreFilter, setGenreFilter] = useState("0");
  //const genreId = Number(genreFilter);

  return (
    <>
      <NavigationDrawer title={title} />
      <Grid container spacing={2}>
        <Grid item xs={6} spacing={2}>
          <UsableMap props={props} />
        </Grid>
        <Grid item xs={6}>
          <DetailsCard props={props} action={action} />
        </Grid>
      </Grid>
    </>
  );
}
export default DetailsPageTemplate;
