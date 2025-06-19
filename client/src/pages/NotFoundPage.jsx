import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { Home, Search } from "@mui/icons-material";
export default function NotFoundPage() {
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
        <Typography
          variant="h1"
          sx={{
            fontSize: "8rem",
            fontWeight: "bold",
            color: "primary.main",
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </Typography>
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
          <Button
            variant="outlined"
            startIcon={<Search />}
            onClick={() => navigate("/events")}
          >
            Browse Events
          </Button>
        </Box>
      </Box>
    </Container>
  );
}