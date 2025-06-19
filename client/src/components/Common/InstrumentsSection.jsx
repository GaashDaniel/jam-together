import React from "react";
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { COMMON_INSTRUMENTS } from "../../constants/instruments.js";
export default function InstrumentsSection({
  instruments,
  onInstrumentChange,
  onAddInstrument,
  onRemoveInstrument,
  disabled = false,
  showTitle = true,
}) {
  return (
    <>
      {showTitle && (
        <>
          <Divider sx={{ my: 2 }}>Your Instruments</Divider>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 1 }}
          >
            Add at least one instrument you play.
          </Typography>
        </>
      )}
      {instruments.map((instrumentEntry, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <FormControl fullWidth>
              <InputLabel id={`instrument-label-${index}`}>
                Instrument #{index + 1}
              </InputLabel>
              <Select
                labelId={`instrument-label-${index}`}
                value={instrumentEntry.instrument}
                onChange={(e) =>
                  onInstrumentChange(index, "instrument", e.target.value)
                }
                label={`Instrument #${index + 1}`}
                disabled={disabled}
              >
                <MenuItem value="">
                  <em>Select an instrument</em>
                </MenuItem>
                {COMMON_INSTRUMENTS.map((inst) => (
                  <MenuItem key={inst} value={inst}>
                    {inst}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Experience (Years)"
              type="text"
              inputMode="numeric"
              value={instrumentEntry.experienceInYears}
              onChange={(e) =>
                onInstrumentChange(index, "experienceInYears", e.target.value)
              }
              disabled={disabled}
            />
            <IconButton
              onClick={() => onRemoveInstrument(index)}
              disabled={instruments.length <= 1 || disabled}
              color="error"
              sx={{ mt: 1 }}
            >
              <RemoveCircleOutline />
            </IconButton>
          </Stack>
        </Box>
      ))}
      <Button
        startIcon={<AddCircleOutline />}
        onClick={onAddInstrument}
        disabled={instruments.length >= 10 || disabled}
        size="small"
      >
        Add Another Instrument
      </Button>
    </>
  );
}