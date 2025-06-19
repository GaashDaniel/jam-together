import React from "react";
import {
  Paper,
  Box,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
} from "@mui/material";
import { FilterList, GridView, ViewList } from "@mui/icons-material";
import SearchBar from "../Common/SearchBar";
import useTheme from "../../shared/hooks/useTheme";
const JamEventsSearchControls = ({
  filters,
  onSearch,
  showFilters,
  onToggleFilters,
  activeFiltersCount,
  onClearFilters,
  viewMode,
  onViewModeChange,
  isSmallScreen,
}) => {
  const { theme, isDark, getTextColor, getThemeColor } = useTheme();
  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        background: isDark
          ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
          : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <SearchBar
        onSearch={onSearch}
        initialValue={filters.search}
        placeholder="Search events by title, location, or genre..."
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant={showFilters ? "contained" : "outlined"}
          startIcon={<FilterList />}
          onClick={onToggleFilters}
          sx={{
            backgroundColor: showFilters
              ? theme.palette.primary.main
              : "transparent",
            borderColor: theme.palette.primary.main,
            color: showFilters ? "white" : theme.palette.primary.main,
            "&:hover": {
              backgroundColor: showFilters
                ? theme.palette.primary.dark
                : getThemeColor("#f5f5f5", "#2a2a2a"),
            },
          }}
        >
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
        {activeFiltersCount > 0 && (
          <Button
            variant="text"
            onClick={onClearFilters}
            sx={{
              color: getTextColor("secondary"),
              "&:hover": {
                backgroundColor: getThemeColor("#f5f5f5", "#2a2a2a"),
              },
            }}
          >
            Clear All
          </Button>
        )}
        <Box sx={{ ml: "auto" }}>
          {!isSmallScreen && (
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={onViewModeChange}
              aria-label="view mode"
              size="small"
              sx={{
                "& .MuiToggleButton-root": {
                  color: getTextColor("secondary"),
                  borderColor: getThemeColor("#e0e0e0", "#424242"),
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  },
                  "&:hover": {
                    backgroundColor: getThemeColor("#f5f5f5", "#2a2a2a"),
                  },
                },
              }}
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridView />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ViewList />
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
export default JamEventsSearchControls;