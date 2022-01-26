import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
//import Image from "../../public/images/home_image";

export default function TourCard(props) {
  const { uid, title, owner, city, country, image, poi } = props.tour;
  const navigate = useNavigate();
  const activeTourId = useParams();
  const [activeTour, setActiveTour] = useState(null);

  useEffect(() => {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          // The ID is the key
          console.log(uid);
          // The Object is foo[key]
          console.log(tours[uid]);
          setActiveTour(tours[uid]);
          console.log(activeTour);
        });
      }
    });
  }, []);

  function PoiButtons(props) {
    return (
      <>
        {activeTour && <Button size="small">Add to Tour</Button>}
        <Button size="small">View Details</Button>
        <Button size="small" onClick={onDelete}>
          Delete
        </Button>
      </>
    );
  }

  function TourButtons(props) {
    return (
      <>
        <Button size="small" onClick={() => handleTourDetailsClick()}>
          View Tour
        </Button>
        <Button size="small" onClick={onDelete}>
          Delete
        </Button>
      </>
    );
  }

  function UsableButtons(props) {
    if (poi) {
      return <PoiButtons />;
    } else {
      return <TourButtons />;
    }
  }

  function onDelete(id) {
    if (window.confirm("Are you sure you want to Delete this?")) {
      console.log(id);
    }
  }

  async function handleTourDetailsClick(props) {
    navigate(`/tour/${uid}`);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={image} alt="tour image" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {city}, {country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tour Guide: {owner}
        </Typography>
      </CardContent>
      <CardActions>
        <UsableButtons />
      </CardActions>
    </Card>
  );
}
