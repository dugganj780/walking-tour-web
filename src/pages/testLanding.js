import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
//import '../App.css';
//import '../index.css';

const TestPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <>
      <Typography variant="h4">You've Logged In</Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default TestPage;
