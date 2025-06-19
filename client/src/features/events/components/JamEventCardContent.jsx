import React from "react";
import { CardContent, Typography, Chip, Stack, Tooltip } from "@mui/material";
import useTheme from "../../../shared/hooks/useTheme";
const JamEventCardContent = ({ eventData }) => {
  const { theme, getTextColor, getThemeColor } = useTheme();
  return (
    <>
      {eventData.genres && eventData.genres.length > 0 && (
        <Stack
          sx={{
            padding: 1,
            minHeight: "40px",
          }}
        >
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              flexWrap: "wrap",
              gap: 0.5,
              alignItems: "flex-start",
            }}
          >
            {eventData.genres.slice(0, 3).map((genre, i) => (
              <Chip
                key={i}
                label={genre}
                size="small"
                sx={{
                  backgroundColor: getThemeColor("#f5f5f5", "#404040"),
                  color: getTextColor("primary"),
                  "&:hover": {
                    backgroundColor: getThemeColor("#e0e0e0", "#505050"),
                  },
                }}
              />
            ))}
          </Stack>
          {eventData.genres.length > 3 && (
            <Stack
              direction="row"
              sx={{
                mt: 0.5,
                alignItems: "flex-start",
              }}
            >
              <Chip
                label={`+${eventData.genres.length - 3} more`}
                size="small"
                variant="outlined"
                sx={{
                  fontWeight: "medium",
                  borderColor: getThemeColor("#e0e0e0", "#424242"),
                  color: getTextColor("secondary"),
                  "&:hover": {
                    backgroundColor: getThemeColor("#f5f5f5", "#2a2a2a"),
                  },
                }}
              />
            </Stack>
          )}
        </Stack>
      )}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            height: "60px",
            lineHeight: 1.4,
            color: getTextColor("secondary"),
          }}
        >
          {eventData.content}
        </Typography>
      </CardContent>
      <Stack
        sx={{
          padding: 1,
          minHeight: "48px",
        }}
      >
        <Stack
          direction="row"
          sx={{
            flexWrap: "wrap",
            gap: 0.5,
            alignItems: "flex-start",
          }}
        >
          {eventData.instruments?.slice(0, 3).map((instrument, i) => (
            <Tooltip
              key={i}
              title={
                instrument.playedBy
                  ? `Played by: ${
                      typeof instrument.playedBy === "object" &&
                      instrument.playedBy.username
                        ? instrument.playedBy.username
                        : "Unknown User"
                    }`
                  : "Available"
              }
            >
              <Chip
                label={instrument.instrument}
                color={instrument.playedBy ? "success" : "default"}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: instrument.playedBy
                    ? theme.palette.success.main
                    : getThemeColor("#e0e0e0", "#424242"),
                  color: instrument.playedBy
                    ? theme.palette.success.main
                    : getTextColor("secondary"),
                  "&:hover": {
                    backgroundColor: instrument.playedBy
                      ? getThemeColor("#e8f5e8", "#1a2e1a")
                      : getThemeColor("#f5f5f5", "#2a2a2a"),
                  },
                }}
              />
            </Tooltip>
          ))}
        </Stack>
        {eventData.instruments && eventData.instruments.length > 3 && (
          <Stack
            direction="row"
            sx={{
              mt: 0.5,
              alignItems: "flex-start",
            }}
          >
            <Tooltip
              title={`${eventData.instruments
                .slice(3)
                .map((inst) => inst.instrument)
                .join(", ")}`}
            >
              <Chip
                label={`+ ${eventData.instruments.length - 3}`}
                size="small"
                variant="outlined"
                sx={{
                  fontWeight: "medium",
                  borderColor: getThemeColor("#e0e0e0", "#424242"),
                  color: getTextColor("secondary"),
                  "&:hover": {
                    backgroundColor: getThemeColor("#f5f5f5", "#2a2a2a"),
                  },
                }}
              />
            </Tooltip>
          </Stack>
        )}
      </Stack>
    </>
  );
};
export default JamEventCardContent;