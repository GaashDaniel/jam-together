import React from "react";
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import useTheme from "../../shared/hooks/useTheme";
import LocationFilter from "./EventFilterComponents/LocationFilter";
import DateRangeFilter from "./EventFilterComponents/DateRangeFilter";
import GenresFilter from "./EventFilterComponents/GenresFilter";
import InstrumentsFilter from "./EventFilterComponents/InstrumentsFilter";
import FilterActions from "./EventFilterComponents/FilterActions";
import useEventFilters from "./EventFilterComponents/useEventFilters";
export default function EventFilters({ filters, onFilterChange, onClose }) {
  const { theme, isDark } = useTheme();
  const { locationInput, dateError, handlers } = useEventFilters(
    filters,
    onFilterChange
  );
  return (
    <Paper
      sx={{
        p: 3,
        mb: 2,
        background: isDark
          ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
          : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Filter Events</Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>
      <Stack spacing={3}>
        <LocationFilter
          locationInput={locationInput}
          onChange={handlers.handleLocationInputChange}
        />
        <DateRangeFilter
          filters={filters}
          dateError={dateError}
          onDateFromChange={handlers.handleDateFromChange}
          onDateToChange={handlers.handleDateToChange}
        />
        <GenresFilter
          filters={filters}
          onChange={handlers.handleGenreChange}
          onRemove={handlers.removeGenre}
        />
        <InstrumentsFilter
          filters={filters}
          onChange={handlers.handleInstrumentChange}
          onRemove={handlers.removeInstrument}
        />
        <Divider />
        <FilterActions
          onClear={handlers.handleClearFilters}
          onClose={onClose}
        />
      </Stack>
    </Paper>
  );
}