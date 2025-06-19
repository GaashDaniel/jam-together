import React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Checkbox,
  Avatar,
  Stack,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import {
  Visibility,
  Delete,
  PersonAdd,
  PersonRemove,
  AdminPanelSettingsOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { formatDateTime, getInitials } from "../../../utils/formatters";
import useTheme from "../../../shared/hooks/useTheme";
const AdminUserRow = ({
  userItem,
  isSelected,
  currentUserId,
  onUserSelection,
  onViewProfile,
  onPromoteUser,
  onDemoteUser,
  onDeleteUser,
}) => {
  const { adminTheme, getThemeColor } = useTheme();
  const getUserStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "banned":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };
  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: getThemeColor("#f8f9fa", "#2a2a2a"),
        },
        backgroundColor: isSelected
          ? getThemeColor("#e3f2fd", "#1a237e")
          : "transparent",
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected}
          onChange={() => onUserSelection(userItem._id)}
          sx={{
            color: adminTheme.admin.primary,
            "&.Mui-checked": {
              color: adminTheme.admin.primary,
            },
          }}
        />
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            src={userItem.profilePicture}
            alt={`${userItem.username}'s profile picture`}
            onClick={() => onViewProfile(userItem.username)}
            sx={{
              bgcolor: adminTheme.admin.primary,
              width: 40,
              height: 40,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            {getInitials(userItem.username)}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                color: adminTheme.admin.text.primary,
              }}
            >
              {userItem.fullName || userItem.username}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: adminTheme.admin.text.secondary,
              }}
            >
              @{userItem.username}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={{ color: adminTheme.admin.text.primary }}>
        {userItem.email}
      </TableCell>
      <TableCell>
        <Chip
          label={userItem.role}
          color={userItem.role === "admin" ? "secondary" : "default"}
          size="small"
          icon={
            userItem.role === "admin" ? (
              <AdminPanelSettingsOutlined />
            ) : (
              <PersonOutlined />
            )
          }
          sx={{
            backgroundColor:
              userItem.role === "admin"
                ? adminTheme.admin.secondary
                : getThemeColor("#e9ecef", "#495057"),
            color:
              userItem.role === "admin"
                ? "white"
                : adminTheme.admin.text.primary,
          }}
        />
      </TableCell>
      <TableCell>
        <Chip
          label={userItem.status || "active"}
          color={getUserStatusColor(userItem.status)}
          size="small"
        />
      </TableCell>
      <TableCell sx={{ color: adminTheme.admin.text.primary }}>
        {formatDateTime(userItem.createdAt)}
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Profile">
            <IconButton
              size="small"
              onClick={() => onViewProfile(userItem.username)}
              sx={{
                color: adminTheme.admin.text.secondary,
              }}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          {userItem.role === "user" && (
            <Tooltip title="Promote to Admin">
              <IconButton
                size="small"
                color="success"
                onClick={() => onPromoteUser(userItem)}
              >
                <PersonAdd />
              </IconButton>
            </Tooltip>
          )}
          {userItem.role === "admin" && userItem._id !== currentUserId && (
            <Tooltip title="Demote to User">
              <IconButton
                size="small"
                color="warning"
                onClick={() => onDemoteUser(userItem)}
              >
                <PersonRemove />
              </IconButton>
            </Tooltip>
          )}
          {userItem._id !== currentUserId && (
            <Tooltip title="Delete User">
              <IconButton
                size="small"
                color="error"
                onClick={() => onDeleteUser(userItem)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};
export default AdminUserRow;