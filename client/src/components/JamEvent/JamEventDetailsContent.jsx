import React from "react";
import { Box, Typography, Chip, Stack, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import useTheme from "../../shared/hooks/useTheme";
const JamEventDetailsContent = ({
  event,
  user,
  canJoin,
  isPastEvent,
  isOwner,
  hasRequested,
  onGenreClick,
  onInstrumentClick,
  onJoinClick,
  getRequestStatusButton,
}) => {
  const { theme, getTextColor, getThemeColor } = useTheme();
  return (
    <>
      {}
      {event.genres?.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
          {event.genres.map((genre, index) => (
            <Chip
              key={index}
              label={genre}
              size="small"
              onClick={() => onGenreClick(genre)}
              sx={{
                cursor: "pointer",
                backgroundColor: getThemeColor("#f5f5f5", "#404040"),
                color: getTextColor("primary"),
                "&:hover": {
                  backgroundColor: getThemeColor("#e0e0e0", "#505050"),
                },
              }}
            />
          ))}
        </Stack>
      )}
      {}
      <Typography
        variant="body1"
        paragraph
        sx={{ color: getTextColor("secondary") }}
      >
        {event.content}
      </Typography>
      {}
      {event.instruments?.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: getTextColor("primary") }}
          >
            Instruments Needed
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {event.instruments.map((instrument, index) => (
              <Chip
                key={index}
                label={instrument.instrument}
                size="small"
                color={instrument.playedBy ? "success" : "default"}
                variant="outlined"
                onClick={() => onInstrumentClick(instrument.instrument)}
                sx={{
                  cursor: "pointer",
                  backgroundColor: instrument.playedBy
                    ? getThemeColor("#e8f5e8", "#1a3d1a")
                    : "transparent",
                  borderColor: instrument.playedBy
                    ? theme.palette.success.main
                    : getThemeColor("#e0e0e0", "#525252"),
                  color: instrument.playedBy
                    ? theme.palette.success.main
                    : getTextColor("primary"),
                  "&:hover": {
                    backgroundColor: instrument.playedBy
                      ? getThemeColor("#d4edda", "#2d5a2d")
                      : getThemeColor("#f5f5f5", "#404040"),
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
      {}
      {canJoin && (
        <Button
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={onJoinClick}
          sx={{
            mt: 2,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Request to Join
        </Button>
      )}
      {isPastEvent && !isOwner && (
        <Button
          variant="outlined"
          size="large"
          disabled
          sx={{
            mt: 2,
            borderColor: getThemeColor("#e0e0e0", "#525252"),
            color: getTextColor("disabled"),
          }}
        >
          Event Has Ended
        </Button>
      )}
      {hasRequested && getRequestStatusButton()}
    </>
  );
};
export default JamEventDetailsContent;