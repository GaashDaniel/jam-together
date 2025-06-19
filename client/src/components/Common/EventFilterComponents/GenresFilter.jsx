import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
} from "@mui/material";
import { GENRES } from "./filterConstants";
const GenresFilter = ({ filters, onChange, onRemove }) => (
  <FormControl fullWidth size="small">
    <InputLabel>Genres</InputLabel>
    <Select
      multiple
      value={filters.genres}
      onChange={onChange}
      renderValue={(selected) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((value) => (
            <Chip
              key={value}
              label={value}
              size="small"
              onDelete={() => onRemove(value)}
              onMouseDown={(event) => event.stopPropagation()}
            />
          ))}
        </Box>
      )}
    >
      {GENRES.map((genre) => (
        <MenuItem key={genre} value={genre}>
          {genre.charAt(0).toUpperCase() + genre.slice(1)}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
GenresFilter.displayName = "GenresFilter";
export default GenresFilter;