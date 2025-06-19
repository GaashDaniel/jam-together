import React from "react";
import {
  CardActions,
  IconButton,
  Button,
  Badge,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Comment,
  MoreVert,
  Edit,
  Delete,
  Visibility,
} from "@mui/icons-material";
import AuthModal from "../../features/auth/components/AuthModal";
export default function UnifiedEventCardActions({
  type,
  mode,
  isLiked,
  likes,
  isLikeLoading,
  isOwner,
  requestCount,
  joinRequest,
  isLoading,
  onCancel,
  menuAnchorEl,
  authModalOpen,
  setAuthModalOpen,
  isPastEvent,
  eventData,
  handleLike,
  handleViewDetails,
  handleViewRequests,
  handleMenuOpen,
  handleMenuClose,
  handleViewEvent,
  handleEdit,
  handleDelete,
  handleCancelRequest,
}) {
  return (
    <>
      <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
        {type === "event" ? (
          <>
            {}
            <IconButton
              aria-label="add to favorites"
              onClick={handleLike}
              disabled={isLikeLoading}
              color={isLiked ? "error" : "default"}
            >
              <Badge badgeContent={likes.length} color="error">
                {isLiked ? <Favorite /> : <FavoriteBorder />}
              </Badge>
            </IconButton>
            {}
            <IconButton
              aria-label="view requests"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleViewDetails(e);
              }}
              sx={{
                "& .MuiBadge-root": {
                  pointerEvents: "none",
                },
              }}
            >
              <Badge badgeContent={requestCount} color="primary">
                <Comment />
              </Badge>
            </IconButton>
            {}
            {isOwner && (
              <IconButton aria-label="more actions" onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
            )}
            {mode === "preview" && (
              <Button
                size="small"
                variant="outlined"
                sx={{ ml: "auto", minWidth: "100px" }}
                onClick={handleViewDetails}
              >
                View Details
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              size="small"
              onClick={handleViewDetails}
              disabled={!eventData}
            >
              View Event
            </Button>
            {joinRequest?.status === "pending" && onCancel && (
              <Button
                size="small"
                color="error"
                onClick={handleCancelRequest}
                disabled={isLoading}
                sx={{ ml: "auto" }}
              >
                {isLoading ? "Cancelling..." : "Cancel Request"}
              </Button>
            )}
          </>
        )}
      </CardActions>
      {}
      {isPastEvent && type === "event" && (
        <Chip
          label="Past Event"
          size="small"
          color="warning"
          sx={{
            position: "absolute",
            top: 8,
            right: -8,
            zIndex: 2,
          }}
        />
      )}
      {}
      {type === "event" && (
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem onClick={handleViewEvent}>
            <Visibility sx={{ mr: 1 }} />
            View Details
          </MenuItem>
          <MenuItem onClick={handleEdit}>
            <Edit sx={{ mr: 1 }} />
            Edit Event
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            <Delete sx={{ mr: 1 }} />
            Delete Event
          </MenuItem>
        </Menu>
      )}
      {}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
      />
    </>
  );
}