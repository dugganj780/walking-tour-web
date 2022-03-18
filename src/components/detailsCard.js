import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: "90vh",
    margin: "10px",
  },
});

function DetailsCard(props) {
  console.log(props);
  const classes = useStyles();
  const { uid, title, owner, city, country, image, lat, lng, poi } =
    props.props;
  const navigate = useNavigate();

  function PoiButtons(props) {
    return (
      <>
        <Button variant="outlined">Add to Tour</Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="outlined">Delete</Button>
      </>
    );
  }

  function TourButtons(props) {
    return (
      <>
        <Button variant="outlined" onClick={handleTourDetailsClick}>
          Add Destinations
        </Button>
        <Button variant="outlined" onClick={handleDeleteTour}>
          Delete
        </Button>
      </>
    );
  }

  function ShowLatLng(props) {
    if (poi) {
      return (
        <>
          <Typography variant="body2" color="text.secondary">
            Latitude: {lat}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Longitude: {lng}
          </Typography>
        </>
      );
    } else {
      return null;
    }
  }

  function UsableButtons(props) {
    if (poi) {
      return <PoiButtons />;
    } else {
      return <TourButtons />;
    }
  }

  async function handleTourDetailsClick() {
    navigate(`/poilist/${uid}`);
  }

  function handleDeleteTour(props) {
    const tourId = uid;
    console.log(tourId);

    const tourRef = db.ref("tours");
    tourRef.once("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            // The ID is the key
            console.log(uid);
            // The Object is foo[key]
            console.log(tours[uid]);
            //const tourPoiRef = db.ref(`tours/${uid}/pois`);
            db.ref(`/tours/${uid}`).remove();
            navigate("/tourlist");
          } else {
            console.log("Could not delete tour");
          }
        });
      }
    });
  }

  return (
    <Card className={classes.card}>
      <CardMedia component="img" height="33%" image={image} alt="tour image" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Location: {city}, {country}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Tour Guide: {owner}
        </Typography>
        <ShowLatLng />
      </CardContent>
      <CardActions>
        <UsableButtons />
      </CardActions>
    </Card>
  );
}

export default DetailsCard;
