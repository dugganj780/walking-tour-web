import React, { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { Stack } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    spacing: 2,
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardaction: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: 20,
    height: "100%",
    width: "100%",
    margin: "20px auto",
  },
});

export default function LoginForm() {
  const email = useRef();
  const password = useRef();
  const { register } = useAuth();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await register(email.current.value, password.current.value);
      navigate("/register");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email.current.value, password.current.value);
      navigate("/tourlist");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <Paper className={classes.paper}>
      <Avatar>
        <LockOutlined />
      </Avatar>
      <Typography variant="h5">Login or Register</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Stack spacing={2}>
        <TextField
          id="email"
          label="Email"
          type="email"
          variant="standard"
          inputRef={email}
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="standard"
          inputRef={password}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleLoginSubmit}
          disabled={loading}
          fullWidth
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={handleRegisterSubmit}
          disabled={loading}
          fullWidth
        >
          Register
        </Button>
      </Stack>
    </Paper>
  );
}
