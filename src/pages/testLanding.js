import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import TourList from "../components/tourList";
import MapView from "../components/mapView";
import PageTemplate from "../components/pageTemplateDetails";
import Image from "../images/home_image.jpg";

//import '../App.css';
//import '../index.css';

const TestPage = (props) => {
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
  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return <PageTemplate title="Test" props={tours} />;
};

export default TestPage;
