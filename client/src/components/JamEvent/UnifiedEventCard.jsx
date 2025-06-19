import React from "react";
import {
  Card,
  CardContent,
  Box,
  Divider,
  Stack,
  Chip,
  Typography,
} from "@mui/material";
import useTheme from "../../shared/hooks/useTheme";
import { useUnifiedEventCard } from "../../hooks/useUnifiedEventCard";
import UnifiedEventCardHeader from "./UnifiedEventCardHeader";
import RequestCardContent from "./RequestCardContent";
import UnifiedEventCardActions from "./UnifiedEventCardActions";
export default function UnifiedEventCard({
  jamEvent,
  joinRequest,
  mode = "preview",
  onEdit,
  onDelete,
  onCancel,
  isLoading = false,
  type = "event", 
}) {
  const { theme, isDark } = useTheme();
  const {
    likes,
    isLikeLoading,
    authModalOpen,
    setAuthModalOpen,
    menuAnchorEl,
    eventData,
    isLiked,
    requestCount,
    isPastEvent,
    isOwner,
    handleCardClick,
    handleLike,
    handleMenuOpen,
    handleMenuClose,
    handleEdit,
    handleDelete,
    handleViewDetails,
    handleViewEvent,
    handleCancelRequest,
    handleViewRequests,
    getTitleFontSize,
    getStatusColor,
    formatDate,
  } = useUnifiedEventCard({
    jamEvent,
    joinRequest,
    type,
    onEdit,
    onDelete,
    onCancel,
  });
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
      border: "3px solid red",
    },
  };
  const renderEventContent = () => (
    <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
      {}
      {eventData.genres && eventData.genres.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
        >
          {eventData.genres.slice(0, 3).map((genre, index) => (
            <Chip key={index} label={genre} size="small" />
          ))}
          {eventData.genres.length > 3 && (
            <Chip
              label={`+${eventData.genres.length - 3}`}
              size="small"
              variant="outlined"
              sx={{ display: "block", width: "fit-content" }}
            />
          )}
        </Stack>
      )}
      {}
      {eventData.requiredInstruments &&
        eventData.requiredInstruments.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
          >
            {eventData.requiredInstruments
              .slice(0, 3)
              .map((instrument, index) => (
                <Chip
                  key={index}
                  label={instrument}
                  size="small"
                  variant="outlined"
                />
              ))}
            {eventData.requiredInstruments.length > 3 && (
              <Chip
                label={`+${eventData.requiredInstruments.length - 3}`}
                size="small"
                variant="outlined"
                sx={{ display: "block", width: "fit-content" }}
              />
            )}
          </Stack>
        )}
      {}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          height: "60px",
          lineHeight: 1.4,
        }}
      >
        {eventData.content}
      </Typography>
    </CardContent>
  );
  return (
    <Box
      className="jam-event"
      data-mode={mode}
      sx={{ position: "relative", width: "100%" }}
    >
      <Card sx={cardSx} onClick={handleCardClick}>
        <UnifiedEventCardHeader
          type={type}
          eventData={eventData}
          getTitleFontSize={getTitleFontSize}
        />
        {type === "request" ? (
          <RequestCardContent
            joinRequest={joinRequest}
            eventData={eventData}
            getStatusColor={getStatusColor}
            formatDate={formatDate}
          />
        ) : (
          renderEventContent()
        )}
        <Divider />
        <UnifiedEventCardActions
          type={type}
          mode={mode}
          isLiked={isLiked}
          likes={likes}
          isLikeLoading={isLikeLoading}
          isOwner={isOwner}
          requestCount={requestCount}
          joinRequest={joinRequest}
          isLoading={isLoading}
          onCancel={onCancel}
          menuAnchorEl={menuAnchorEl}
          authModalOpen={authModalOpen}
          setAuthModalOpen={setAuthModalOpen}
          isPastEvent={isPastEvent}
          eventData={eventData}
          handleLike={handleLike}
          handleViewDetails={handleViewDetails}
          handleViewRequests={handleViewRequests}
          handleMenuOpen={handleMenuOpen}
          handleMenuClose={handleMenuClose}
          handleViewEvent={handleViewEvent}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleCancelRequest={handleCancelRequest}
        />
      </Card>
    </Box>
  );
}