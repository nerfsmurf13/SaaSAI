import React from "react";
import { Box, Link, Typography, useTheme, useMediaQuery, Collapse, Alert, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotScreen = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const forgotHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/forgot-password", { email }, config);
      navigate("/reset-sent");
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

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p="2rem"
      m="2rem auto"
      borderRadius={5}
      backgroundColor={theme.palette.background.alt}
      sx={{ boxShadow: 5 }}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={forgotHandler}>
        <Typography variant="h3">Forgot password</Typography>
        <TextField
          label="Account Email"
          margin="normal"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button fullWidth variant="contained" type="submit" size="large" sx={{ color: "white", mt: 2 }}>
          Send Reset Code
        </Button>
      </form>
      <Typography mt={2}>
        Already have an account? <Link href="/login">Sign in</Link>
      </Typography>
    </Box>
  );
};

export default ForgotScreen;
