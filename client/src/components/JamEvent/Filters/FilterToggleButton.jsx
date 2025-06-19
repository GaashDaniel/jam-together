import React from "react";
import { Button } from "@mui/material";
import { FilterList } from "@mui/icons-material";
const FilterToggleButton = React.memo(
  ({ showFilters, setShowFilters, activeCount }) => (
    <Button
      variant={showFilters ? "contained" : "outlined"}
      startIcon={<FilterList />}
      onClick={() => setShowFilters(!showFilters)}
      size="small"
    >
      Filters {activeCount > 0 && `(${activeCount})`}
    </Button>
  )
);
FilterToggleButton.displayName = "FilterToggleButton";
export default FilterToggleButton;