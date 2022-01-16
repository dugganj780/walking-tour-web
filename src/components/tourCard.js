import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
//import Image from "../../public/images/home_image";

export default function TourCard(props) {
  const { title, owner, image } = props.tour;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={image} alt="tour image" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {owner}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View Tour</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
