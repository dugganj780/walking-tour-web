import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import TourList from "../components/tourList";
import MapView from "../components/mapViewPoi";
import PageTemplate from "../components/pageTemplateDetails";
import Image from "../images/home_image.jpg";

//import '../App.css';
//import '../index.css';

const PoiDetailsPage = (props) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const tours = [
    {
      id: "1",
      title: "UCC Tour",
      owner: "James Duggan",
      image: Image,
    },
    {
      id: "2",
      title: "UCD Tour",
      owner: "James Cuggan",
      image: Image,
    },
  ];

  const singleTour = {
    id: "2",
    title: "UCD Tour",
    owner: "James Cuggan",
    ownerid: "user2",
    image: Image,
    city: "Dublin",
    country: "Ireland",
    orienteering: false,
    category: "Historical",
    pois: [singlePoi1, singlePoi2],
  };

  const singlePoi1 = {
    uid: "poi2",
    poi: true,
    title: "UCC Main Gate",
    owner: "James Duggan",
    ownerid: "user1",
    city: "Cork",
    lat: 51.895454,
    lng: -8.488992,
    image: Image,
    recording: "",
  };

  const singlePoi2 = {
    uid: "poi3",
    poi: true,
    title: "UCC Main Quad",
    owner: "James Duggan",
    ownerid: "user1",
    city: "Cork",
    lat: 51.89351910516512,
    lng: -8.4921026871898,
    image: Image,
    recording: "",
  };

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return <PageTemplate title="Destination Details" props={singlePoi1} />;
};

export default PoiDetailsPage;
