import React from "react";
import { CardActions, IconButton, Button, Tooltip, Badge } from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Visibility,
} from "@mui/icons-material";
import useTheme from "../../../shared/hooks/useTheme";
const JamEventCardFooter = ({
  eventData,
  user,
  isLiked,
  isLoading,
  requestCount,
  likes,
  onLike,
  onViewDetails,
}) => {
  const { theme, getTextColor } = useTheme();
  return (
    <CardActions disableSpacing>
      <Tooltip title={isLiked ? "Unlike" : "Like (Favorite)"}>
        <span>
          <IconButton
            aria-label="like favorite"
            onClick={onLike}
            disabled={isLoading}
            sx={{
              color: isLiked
                ? theme.palette.error.main
                : getTextColor("secondary"),
              "&:hover": {
                backgroundColor: isLiked
                  ? theme.palette.error.light + "20"
                  : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <Badge
              badgeContent={(likes || eventData.likes || []).length}
              color="primary"
            >
              {isLiked ? <Favorite /> : <FavoriteBorder />}
            </Badge>
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Join Requests">
        <IconButton
          aria-label="join requests"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onViewDetails(e);
          }}
          sx={{
            color: getTextColor("secondary"),
            "& .MuiBadge-root": {
              pointerEvents: "none",
            },
          }}
        >
          <Badge badgeContent={requestCount} color="primary">
            <Comment />
          </Badge>
        </IconButton>
      </Tooltip>
      <Button
        size="small"
        startIcon={<Visibility />}
        onClick={onViewDetails}
        sx={{
          ml: "auto",
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.light + "20",
          },
        }}
      >
        View Details
      </Button>
    </CardActions>
  );
};
export default JamEventCardFooter;