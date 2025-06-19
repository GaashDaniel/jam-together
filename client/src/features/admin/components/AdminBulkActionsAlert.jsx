import React from "react";
import { Alert, Button, Stack } from "@mui/material";
import useTheme from "../../../shared/hooks/useTheme";
const AdminBulkActionsAlert = ({
  selectedCount,
  onBulkAction,
  onClear,
  type = "users",
}) => {
  const { getThemeColor } = useTheme();
  if (selectedCount === 0) return null;
  return (
    <Alert
      severity="info"
      sx={{
        mb: 2,
        backgroundColor: getThemeColor("#e3f2fd", "#1a237e"),
        color: getThemeColor("#0d47a1", "#bbdefb"),
      }}
      action={
        <Stack direction="row" spacing={1}>
          {type === "users" && (
            <>
              <Button
                size="small"
                variant="outlined"
                color="inherit"
                onClick={() => onBulkAction("promoteUser")}
              >
                Promote Selected
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="inherit"
                onClick={() => onBulkAction("demoteUser")}
              >
                Demote Selected
              </Button>
            </>
          )}
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() =>
              onBulkAction(type === "users" ? "deleteUser" : "deleteEvent")
            }
          >
            Delete Selected
          </Button>
          <Button size="small" onClick={onClear}>
            Clear
          </Button>
        </Stack>
      }
    >
      {selectedCount} {type === "users" ? "user(s)" : "event(s)"} selected
    </Alert>
  );
};
export default AdminBulkActionsAlert;