import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: "90vh",
    margin: "10px",
    alignContent: "center",
    justifyContent: "center",
  },
});

function NoPoisCard(props) {
  //console.log(props);
  const classes = useStyles();
  //const { title, owner, city, country, image, lat, lng, poi } = props.props;
  //const navigate = useNavigate();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h2" component="div">
          Add Destinations to view map{" "}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NoPoisCard;
