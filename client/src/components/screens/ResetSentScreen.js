import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const ResetSentScreen = () => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p="2rem"
      m="2rem auto"
      borderRadius={5}
      backgroundColor={theme.palette.background.alt}
      sx={{ boxShadow: 5 }}
    >
      <Typography mt={2} variant="h3">
        Check your email!
      </Typography>
      <Typography mt={2}>
        We sent a password reset link to your email. Please check your inbox and follow the instructions to reset your
        password.
      </Typography>
    </Box>
  );
};

export default ResetSentScreen;
