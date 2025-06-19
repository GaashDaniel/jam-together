import React, { useState, useCallback } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Autocomplete,
  Paper,
  InputBase,
} from "@mui/material";
import { Search, Clear } from "@mui/icons-material";
import useTheme from "../../shared/hooks/useTheme";
export default function SearchBar({
  onSearch,
  onChange,
  onClear,
  placeholder = "Search...",
  value = "",
  initialValue = "",
  sx = {},
}) {
  const { theme, isDark } = useTheme();
  const [searchValue, setSearchValue] = useState(initialValue || value);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue.trim());
  };
  const handleClear = () => {
    setSearchValue("");
    if (onChange) {
      onChange("");
    }
    if (onClear) {
      onClear();
    } else {
      onSearch("");
    }
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        background: isDark
          ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
          : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
        ...sx,
      }}
    >
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <Search />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        inputProps={{ "aria-label": placeholder }}
      />
      {searchValue && (
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="clear"
          onClick={handleClear}
        >
          <Clear />
        </IconButton>
      )}
    </Paper>
  );
}