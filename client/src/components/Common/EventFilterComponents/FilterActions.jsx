import React from "react";
import { Box, Button } from "@mui/material";
import { Clear } from "@mui/icons-material";
const FilterActions = ({ onClear, onClose }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Button variant="outlined" startIcon={<Clear />} onClick={onClear}>
      Clear Filters
    </Button>
    <Button variant="contained" onClick={onClose}>
      Apply Filters
    </Button>
  </Box>
);
FilterActions.displayName = "FilterActions";
export default FilterActions;