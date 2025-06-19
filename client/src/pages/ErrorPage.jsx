import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home } from "@mui/icons-material";
export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom color="error">
          Oops! Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We're sorry, but an error occurred while processing your request.
        </Typography>
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
}