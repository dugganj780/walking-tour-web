import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import TourList from "../components/tourList";

//import '../App.css';
//import '../index.css';

const TestPage = () => {
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

  return (
    <>
      <TourList props={tours} />
      <Typography variant="h4">You've Logged In</Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default TestPage;
