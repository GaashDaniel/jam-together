import React from "react";
import { Stack, Chip } from "@mui/material";
const JamEventsActiveFilters = ({
  filters,
  onFilterChange,
  activeFiltersCount,
}) => {
  if (activeFiltersCount === 0) return null;
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
      {filters.genres.map((genre) => (
        <Chip
          key={genre}
          label={`Genre: ${genre}`}
          onDelete={() =>
            onFilterChange({
              ...filters,
              genres: filters.genres.filter((g) => g !== genre),
            })
          }
          size="small"
        />
      ))}
      {filters.instruments.map((instrument) => (
        <Chip
          key={instrument}
          label={`Instrument: ${instrument}`}
          onDelete={() =>
            onFilterChange({
              ...filters,
              instruments: filters.instruments.filter((i) => i !== instrument),
            })
          }
          size="small"
        />
      ))}
      {filters.location && (
        <Chip
          label={`Location: ${filters.location}`}
          onDelete={() => onFilterChange({ ...filters, location: "" })}
          size="small"
        />
      )}
    </Stack>
  );
};
export default JamEventsActiveFilters;