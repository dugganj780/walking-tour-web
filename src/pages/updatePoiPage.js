import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdatePoiForm from "../components/updatePoiForm";
import "../App.css";
import "../index.css";
import Grid from "@mui/material/Grid";
import NavigationDrawer from "../components/navigationDrawer";
import { db } from "../firebase";

const UpdatePoiPage = () => {
  const { poiId } = useParams();
  const [poi, setPoi] = useState(null);

  useEffect(() => {
    const poiRef = db.ref("pois");
    poiRef.on("value", (snap) => {
      const pois = snap.val();
      if (pois !== null) {
        Object.keys(pois).forEach((uid) => {
          if (uid === poiId) {
            // The ID is the key
            console.log(uid);
            // The Object is foo[key]
            console.log(pois[uid]);
            setPoi(pois[uid]);
          }
        });
      }
    });
  }, []);

  return (
    <>
      {poi && (
        <>
          <NavigationDrawer title="Update Tour" />
          <Grid container justify="center">
            <Grid xs={4} />
            <Grid item xs={4} align="center">
              <UpdatePoiForm props={poi} />
            </Grid>
            <Grid xs={4} />
          </Grid>
        </>
      )}
    </>
  );
};

export default UpdatePoiPage;
