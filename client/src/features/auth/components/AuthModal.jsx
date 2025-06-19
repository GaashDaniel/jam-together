import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  Box,
  IconButton,
  DialogActions,
  Button,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { getAccessibleModalProps } from "../../../utils/focusUtils";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}
export default function AuthModal({ open, onClose, initialMode = "login" }) {
  const [tabValue, setTabValue] = useState(initialMode === "register" ? 1 : 0);
  useEffect(() => {
    if (open) {
      setTabValue(initialMode === "register" ? 1 : 0);
    }
  }, [open, initialMode]);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleSuccess = () => {
    onClose();
  };
  const modalProps = getAccessibleModalProps(open, onClose);
  return (
    <Dialog
      {...modalProps}
      maxWidth="sm"
      fullWidth
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: "divider" }}
          aria-label="authentication tabs"
        >
          <Tab label="Login" id="auth-tab-0" aria-controls="auth-tabpanel-0" />
          <Tab
            label="Register"
            id="auth-tab-1"
            aria-controls="auth-tabpanel-1"
          />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <LoginForm onSuccess={handleSuccess} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <RegisterForm
            onSuccess={handleSuccess}
            onSwitchToLogin={() => setTabValue(0)}
          />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
}