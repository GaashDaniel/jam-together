import React from "react";
import { ListItemAvatar, Avatar, Tooltip } from "@mui/material";
import { getInitials } from "./listItemUtils";
import { getProfilePictureUrl } from "../../../utils/formatters";
export default function EventItemAvatar({ event, theme, onNavigate }) {
  return (
    <ListItemAvatar>
      <Tooltip title={event.createdBy?.username || event.createdBy}>
        <Avatar
          onClick={(e) => {
            e.stopPropagation();
            if (event.createdBy?.username) {
              onNavigate(`/profile/${event.createdBy.username}`);
            }
          }}
          sx={{
            bgcolor: theme.palette.primary.main,
            cursor: event.createdBy?.username ? "pointer" : "default",
            "&:hover": event.createdBy?.username
              ? {
                  opacity: 0.8,
                  transform: "scale(1.05)",
                }
              : {},
            transition: "all 0.2s ease-in-out",
          }}
          src={getProfilePictureUrl(event.createdBy?.profilePicture)}
          alt={`${
            event.createdBy?.username || event.createdBy
          }'s profile picture`}
        >
          {getInitials(event.createdBy?.username || event.createdBy)}
        </Avatar>
      </Tooltip>
    </ListItemAvatar>
  );
}