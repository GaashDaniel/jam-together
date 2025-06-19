import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Avatar,
  Tooltip,
  Button,
  useTheme,
} from "@mui/material";
import {
  Person,
  AdminPanelSettings,
  Logout,
  Login,
  PersonAdd,
} from "@mui/icons-material";
import { getProfilePictureUrl } from "../../utils/formatters";
const HeaderUserMenu = ({
  user,
  anchorEl,
  onMenuClose,
  onProfileMenuOpen,
  onLogout,
  onOpenAuthModal,
  isMobile,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <>
      {user ? (
        <>
          <Tooltip title="Account settings">
            <IconButton onClick={onProfileMenuOpen} size="small" sx={{ ml: 2 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: theme.palette.primary.main,
                }}
                src={getProfilePictureUrl(user.profilePicture)}
                alt={`${user.username}'s profile picture`}
              >
                {user.username[0].toUpperCase()}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onMenuClose}
            onClick={onMenuClose}
          >
            <MenuItem disabled>
              <Typography variant="subtitle2">{user.username}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => navigate(`/profile/${user.username}`)}>
              <Person sx={{ mr: 1 }} />
              My Profile
            </MenuItem>
            {user.role === "admin" && (
              <MenuItem onClick={() => navigate("/admin")}>
                <AdminPanelSettings sx={{ mr: 1 }} />
                Admin Dashboard
              </MenuItem>
            )}
            <MenuItem onClick={onLogout}>
              <Logout sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        !isMobile && (
          <>
            <Button
              color="inherit"
              startIcon={<Login />}
              onClick={() => onOpenAuthModal("login")}
            >
              Login
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<PersonAdd />}
              onClick={() => onOpenAuthModal("register")}
              sx={{ borderColor: "rgba(255,255,255,0.5)" }}
            >
              Register
            </Button>
          </>
        )
      )}
    </>
  );
};
export default HeaderUserMenu;