import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
//import Image from "../../public/images/home_image";

export default function TourCard(props) {
  const { title, owner, city, country, image, poi } = props.tour;
  const navigate = useNavigate();

  function PoiButtons(props) {
    return (
      <>
        <Button size="small">Add to Tour</Button>
        <Button size="small">View Details</Button>
        <Button size="small">Delete</Button>
      </>
    );
  }

  function TourButtons(props) {
    return (
      <>
        <Button size="small" onClick={handleTourDetailsClick}>
          View Tour
        </Button>
        <Button size="small">Delete</Button>
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

  async function handleTourDetailsClick() {
    navigate("/poilist");
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
