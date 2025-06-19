import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import useTheme from "../../../shared/hooks/useTheme";
const JamEventJoinDialog = ({
  open,
  onClose,
  user,
  joinRequest,
  availableInstruments,
  isSubmittingJoinRequest,
  onJoinRequestChange,
  onJoinRequest,
}) => {
  const navigate = useNavigate();
  const { theme, getBackgroundColor, getTextColor, getThemeColor } = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: getBackgroundColor("paper"),
          border: `1px solid ${getThemeColor("#e0e0e0", "#424242")}`,
        },
      }}
    >
      <DialogTitle sx={{ color: getTextColor("primary") }}>
        Request to Join Jam Session
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          {}
          <Box
            sx={{
              p: 2,
              backgroundColor: getThemeColor("#f0f7ff", "#1e3a5f"),
              borderRadius: 1,
              border: `1px solid ${getThemeColor("#2196f3", "#1976d2")}`,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: getTextColor("primary"), mb: 1 }}
            >
              <strong>Note:</strong> You can only request to play instruments
              that are in your profile.
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: getTextColor("secondary") }}
            >
              Need to add more instruments?{" "}
              <Typography
                component="span"
                sx={{
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                  textDecoration: "underline",
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
                onClick={() => {
                  onClose();
                  navigate(`/profile/${user?.username}`);
                }}
              >
                Edit your profile
              </Typography>{" "}
              to add instruments at any time.
            </Typography>
          </Box>
          <TextField
            select
            label="Instrument"
            value={joinRequest.instrument}
            onChange={(e) => onJoinRequestChange("instrument", e.target.value)}
            fullWidth
            required
            disabled={!availableInstruments?.length}
            helperText={
              availableInstruments?.length
                ? "Select the instrument you want to play"
                : "No available instruments match your profile"
            }
            sx={{
              "& .MuiInputLabel-root": {
                color: getTextColor("secondary"),
              },
              "& .MuiOutlinedInput-root": {
                color: getTextColor("primary"),
                "& fieldset": {
                  borderColor: getThemeColor("#e0e0e0", "#424242"),
                },
              },
            }}
          >
            {availableInstruments?.map((instrument) => (
              <MenuItem
                key={instrument.instrument || instrument}
                value={instrument.instrument || instrument}
              >
                {instrument.instrument || instrument}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Message (Optional)"
            multiline
            rows={3}
            value={joinRequest.content}
            onChange={(e) => onJoinRequestChange("content", e.target.value)}
            placeholder="Tell the organizer why you'd like to join..."
            fullWidth
            sx={{
              "& .MuiInputLabel-root": {
                color: getTextColor("secondary"),
              },
              "& .MuiOutlinedInput-root": {
                color: getTextColor("primary"),
                "& fieldset": {
                  borderColor: getThemeColor("#e0e0e0", "#424242"),
                },
              },
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          disabled={isSubmittingJoinRequest}
          sx={{ color: getTextColor("secondary") }}
        >
          Cancel
        </Button>
        <Button
          onClick={onJoinRequest}
          variant="contained"
          disabled={isSubmittingJoinRequest || !joinRequest.instrument}
        >
          {isSubmittingJoinRequest ? "Submitting..." : "Send Request"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default JamEventJoinDialog;