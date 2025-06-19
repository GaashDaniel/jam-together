import React from "react";
import { Box, Container, Typography, Button, Paper, Fade } from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import SearchBar from "../../../shared/components/ui/SearchBar";
export default function HeroSection({
  user,
  theme,
  isDark,
  currentSearchTerm,
  onSearch,
  onSearchChange,
  onSearchClear,
  onBrowseEventsClick,
  onCreateEventClick,
  onJoinNowClick,
}) {
  return (
    <Paper
      sx={{
        position: "relative",
        background: isDark
          ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
          : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: theme.palette.primary.contrastText,
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        borderRadius: 2,
        boxShadow: theme.shadows[6],
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "url(https://source.unsplash.com/random/1600x900/?music,concert)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Fade in timeout={1000}>
          <Box textAlign="center" py={8}>
            <Typography
              component="h1"
              variant="h2"
              color="inherit"
              gutterBottom
              fontWeight="bold"
              sx={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                fontSize: { xs: "2.5rem", md: "3.75rem" },
              }}
            >
              Welcome to JamTogether
            </Typography>
            <Typography
              variant="h5"
              color="inherit"
              paragraph
              sx={{
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Connect with musicians worldwide and create unforgettable jam
              sessions
            </Typography>
            <SearchBar
              onSearch={onSearch}
              onChange={onSearchChange}
              onClear={onSearchClear}
              initialValue={currentSearchTerm}
              placeholder="Search for jam sessions by location, genre, or instrument..."
              sx={{
                maxWidth: 600,
                mx: "auto",
                my: 4,
                backgroundColor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(15px)",
                borderRadius: theme.shape.borderRadius * 3,
                border: "1px solid rgba(255,255,255,0.2)",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "2px solid rgba(255,255,255,0.3)",
                  },
                },
                "& .MuiInputBase-root": {
                  color: "white",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.8)",
                  opacity: 1,
                },
                "& .MuiIconButton-root": {
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                },
              }}
            />
            <Box
              sx={{
                mt: 4,
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                size="large"
                variant="contained"
                onClick={onBrowseEventsClick}
                startIcon={<Search />}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  px: 4,
                  py: 1.5,
                  borderRadius: theme.shape.borderRadius * 2,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Browse Events
              </Button>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={onCreateEventClick}
                startIcon={<Add />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: theme.shape.borderRadius * 2,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Create Event
              </Button>
              {!user && (
                <Button
                  size="large"
                  variant="outlined"
                  onClick={onJoinNowClick}
                  sx={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.5)",
                    px: 4,
                    py: 1.5,
                    borderRadius: theme.shape.borderRadius * 2,
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "white",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Join Now
                </Button>
              )}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Paper>
  );
}
