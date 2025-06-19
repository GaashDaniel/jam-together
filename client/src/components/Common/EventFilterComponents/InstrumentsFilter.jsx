import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
} from "@mui/material";
import { JAM_EVENT_INSTRUMENTS } from "../../../constants/instruments.js";
const InstrumentsFilter = ({ filters, onChange, onRemove }) => (
  <FormControl fullWidth size="small">
    <InputLabel>Instruments Needed</InputLabel>
    <Select
      multiple
      value={filters.instruments}
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
      {JAM_EVENT_INSTRUMENTS.map((instrument) => (
        <MenuItem key={instrument} value={instrument}>
          {instrument.charAt(0).toUpperCase() + instrument.slice(1)}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
InstrumentsFilter.displayName = "InstrumentsFilter";
export default InstrumentsFilter;