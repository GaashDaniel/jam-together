import React from "react";
import { ListItem, Box, Divider } from "@mui/material";
import useTheme from "../../shared/hooks/useTheme";
import {
  EventItemAvatar,
  EventItemHeader,
  EventItemDetails,
  EventItemContent,
  EventItemGenres,
  EventItemInstruments,
  EventItemActions,
} from "../../features/events/components/JamEventListItem/EventItemComponents";
const JamEventsListItem = ({
  event,
  index,
  totalEvents,
  user,
  onLike,
  likingEvents,
  onNavigate,
  onMenuOpen,
}) => {
  const { theme, getTextColor, getThemeColor } = useTheme();
  return (
    <React.Fragment>
      <ListItem
        sx={{
          py: 2,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: getThemeColor("#f5f5f5", "#2a2a2a"),
          },
        }}
        onClick={() => onNavigate(`/events/${event._id}`)}
      >
        <EventItemAvatar event={event} theme={theme} onNavigate={onNavigate} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <EventItemHeader event={event} getTextColor={getTextColor} />
          <EventItemDetails event={event} getTextColor={getTextColor} />
          <EventItemContent event={event} getTextColor={getTextColor} />
          <EventItemGenres event={event} />
          <EventItemInstruments event={event} />
        </Box>
        <EventItemActions
          event={event}
          user={user}
          likingEvents={likingEvents}
          onLike={onLike}
          onNavigate={onNavigate}
          onMenuOpen={onMenuOpen}
        />
      </ListItem>
      {index < totalEvents - 1 && <Divider />}
    </React.Fragment>
  );
};
export default JamEventsListItem;