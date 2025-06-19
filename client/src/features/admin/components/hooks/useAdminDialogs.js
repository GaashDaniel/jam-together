import { useState } from "react";
export const useAdminDialogs = () => {
  const [actionDialog, setActionDialog] = useState({
    open: false,
    type: "",
    item: null,
    reason: "",
  });
  const [bulkDialog, setBulkDialog] = useState({
    open: false,
    type: "",
    items: [],
  });
  const openActionDialog = (type, item, reason = "") => {
    setActionDialog({ open: true, type, item, reason });
  };
  const openBulkDialog = (type, items) => {
    setBulkDialog({ open: true, type, items });
  };
  const closeActionDialog = () => {
    setActionDialog({ open: false, type: "", item: null, reason: "" });
  };
  const closeBulkDialog = () => {
    setBulkDialog({ open: false, type: "", items: [] });
  };
  const updateActionDialogReason = (reason) => {
    setActionDialog((prev) => ({ ...prev, reason }));
  };
  return {
    actionDialog,
    openActionDialog,
    closeActionDialog,
    updateActionDialogReason,
    bulkDialog,
    openBulkDialog,
    closeBulkDialog,
  };
};