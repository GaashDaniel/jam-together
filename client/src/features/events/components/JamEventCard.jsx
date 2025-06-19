import React from "react";
import { Card, Box, Menu, MenuItem } from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useJamEventCard } from "../hooks/useJamEventCard";
import JamEventCardHeader from "./JamEventCardHeader";
import JamEventCardContent from "./JamEventCardContent";
import JamEventCardFooter from "./JamEventCardFooter";
import JamEventCardModals from "./JamEventCardModals";
import useTheme from "../../../shared/hooks/useTheme";
export default function JamEventCard({
  jamEvent,
  mode = "preview",
  onEdit,
  onDelete,
}) {
  const { theme, isDark } = useTheme();
  if (!jamEvent) {
    return null;
  }
  const {
    eventData,
    likes,
    isLoading,
    authModalOpen,
    menuAnchorEl,
    editModalOpen,
    deleteConfirmOpen,
    isDeleting,
    user,
    isLiked,
    requestCount,
    isOwner,
    handleCardClick,
    handleLike,
    handleViewDetails,
    handleMenuOpen,
    handleMenuClose,
    handleEdit,
    handleDelete,
    handleDeleteEvent,
    handleEventUpdated,
    setAuthModalOpen,
    setEditModalOpen,
    setDeleteConfirmOpen,
  } = useJamEventCard(jamEvent, onEdit, onDelete);
  const getTitleFontSize = (title) => {
    if (!title) return "1.25rem";
    const titleLength = title.length;
    const estimatedCharsPerLine = 18;
    const estimatedLines = Math.ceil(titleLength / estimatedCharsPerLine);
    return estimatedLines > 2 ? "1rem" : "1.25rem";
  };
  const cardSx = {
    width: "100%",
    maxWidth: { xs: "100%", sm: 350, md: 350 },
    height: 480,
    minHeight: 480,
    maxHeight: 480,
    display: "flex",
    flexDirection: "column",
    borderRadius: 2,
    cursor: "pointer",
    background: isDark
      ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
      : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
    border: `1px solid ${theme.palette.divider}`,
    '[data-mode="full-page"] &': {
      maxWidth: "80%",
      margin: 0,
    },
  };
  return (
    <Box
      className="jam-event"
      data-mode={mode}
      sx={{ position: "relative", width: "100%" }}
    >
      <Card sx={cardSx} onClick={handleCardClick}>
        <JamEventCardHeader
          eventData={eventData}
          isOwner={isOwner}
          onMenuOpen={handleMenuOpen}
          getTitleFontSize={getTitleFontSize}
        />
        <JamEventCardContent eventData={eventData} />
        <JamEventCardFooter
          eventData={eventData}
          user={user}
          isLiked={isLiked}
          isLoading={isLoading}
          requestCount={requestCount}
          likes={likes}
          onLike={handleLike}
          onViewDetails={handleViewDetails}
        />
      </Card>
      {}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewDetails}>
          <Visibility sx={{ mr: 1 }} />
          View Event
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} />
          Edit Event
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <Delete sx={{ mr: 1 }} />
          Delete Event
        </MenuItem>
      </Menu>
      <JamEventCardModals
        authModalOpen={authModalOpen}
        setAuthModalOpen={setAuthModalOpen}
        editModalOpen={editModalOpen}
        setEditModalOpen={setEditModalOpen}
        deleteConfirmOpen={deleteConfirmOpen}
        setDeleteConfirmOpen={setDeleteConfirmOpen}
        eventData={eventData}
        handleEventUpdated={handleEventUpdated}
        handleDeleteEvent={handleDeleteEvent}
        isDeleting={isDeleting}
      />
    </Box>
  );
}