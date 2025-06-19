import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import useTheme from "../../../shared/hooks/useTheme";
const AdminActionDialogs = ({
  actionDialog,
  bulkDialog,
  actionLoading,
  onCloseActionDialog,
  onCloseBulkDialog,
  onConfirmAction,
  onConfirmBulkAction,
}) => {
  const { adminTheme, getThemeColor } = useTheme();
  return (
    <>
      {}
      <Dialog
        open={actionDialog.open}
        onClose={onCloseActionDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          elevation: adminTheme.admin.elevation.dialog,
          sx: {
            backgroundColor: adminTheme.admin.background.paper,
            border: `1px solid ${getThemeColor("#e9ecef", "#404040")}`,
          },
        }}
      >
        <DialogTitle sx={{ color: adminTheme.admin.text.primary }}>
          Confirm{" "}
          {actionDialog.type === "delete" && actionDialog.item?.username
            ? "Delete User"
            : actionDialog.type === "delete" && actionDialog.item?.title
            ? "Delete Event"
            : actionDialog.type === "promote"
            ? "Promote to Admin"
            : actionDialog.type === "demote"
            ? "Demote to User"
            : "Action"}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: adminTheme.admin.text.primary }}>
            Are you sure you want to {actionDialog.type}{" "}
            {actionDialog.item?.username || actionDialog.item?.title}?
            {actionDialog.type === "delete" &&
              " This action cannot be undone and will delete all associated data."}
            {actionDialog.type === "promote" &&
              " This will give the user full admin privileges."}
            {actionDialog.type === "demote" &&
              " This will remove admin privileges from the user."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onCloseActionDialog}
            disabled={actionLoading}
            sx={{ color: adminTheme.admin.text.secondary }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirmAction}
            color={actionDialog.type === "delete" ? "error" : "primary"}
            variant="contained"
            disabled={actionLoading}
          >
            {actionLoading
              ? "Processing..."
              : actionDialog.type === "delete"
              ? "Delete"
              : actionDialog.type === "promote"
              ? "Promote"
              : actionDialog.type === "demote"
              ? "Demote"
              : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
      {}
      <Dialog
        open={bulkDialog.open}
        onClose={onCloseBulkDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          elevation: adminTheme.admin.elevation.dialog,
          sx: {
            backgroundColor: adminTheme.admin.background.paper,
            border: `1px solid ${getThemeColor("#e9ecef", "#404040")}`,
          },
        }}
      >
        <DialogTitle sx={{ color: adminTheme.admin.text.primary }}>
          Confirm Bulk{" "}
          {bulkDialog.type?.replace(/([A-Z])/g, " $1").toLowerCase()}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: adminTheme.admin.text.primary }}>
            Are you sure you want to{" "}
            {bulkDialog.type?.replace(/([A-Z])/g, " $1").toLowerCase()}{" "}
            {bulkDialog.items.length} selected items?
            {bulkDialog.type === "deleteUser" &&
              " This action cannot be undone."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onCloseBulkDialog}
            disabled={actionLoading}
            sx={{ color: adminTheme.admin.text.secondary }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirmBulkAction}
            color={bulkDialog.type === "deleteUser" ? "error" : "primary"}
            variant="contained"
            disabled={actionLoading}
          >
            {actionLoading ? "Processing..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AdminActionDialogs;