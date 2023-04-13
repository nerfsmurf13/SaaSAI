import React from "react";
import { Box, Link, Typography, useTheme, useMediaQuery, Collapse, Alert, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ForgotScreen = () => {
  useEffect(() => {
    grabUser();
  });
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const params = useParams([]);

  var user = "";

  // Calls server to check if token valid and grab user
  const grabUser = async (e) => {
    // e.preventDefault();
    console.log("grabing user...");
    try {
      const { data } = await axios.post(`/api/auth/reset-password/`, params, config);
      setEmail(data.email);
      user = data;
      console.log("User Found...");
      console.info(data);
    } catch (err) {
      console.log("Fucking Error...");
      console.log(err);
    }
  };

  // Form submission handler and password updater
  const updatePasswordHandler = async (e) => {
    try {
      e.preventDefault();

      console.log("fe-updatePasswordHandler");
      await axios.post("/api/auth/reset-password-go/", { email, password }, config);
      navigate("/login");
      // navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  let isError = error ? true : false;

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p="2rem"
      m="2rem auto"
      borderRadius={5}
      backgroundColor={theme.palette.background.alt}
      sx={{ boxShadow: 5 }}
    >
      <Collapse in={isError}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={updatePasswordHandler}>
        <Typography variant="h3">Forgot password</Typography>
        <TextField
          label="Account Email"
          margin="normal"
          required
          disabled
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          margin="normal"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth variant="contained" type="submit" size="large" sx={{ color: "white", mt: 2 }}>
          Reset Password
        </Button>
      </form>
      <Typography mt={2}>
        Already have an account? <Link href="/login">Sign in</Link>
      </Typography>
    </Box>
  );
};

export default ForgotScreen;
