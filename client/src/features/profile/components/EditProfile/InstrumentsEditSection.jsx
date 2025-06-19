import React from "react";
import {
  Box,
  Divider,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { COMMON_INSTRUMENTS } from "../../../constants/instruments.js";

const InstrumentsEditSection = ({
  formData,
  onInstrumentChange,
  onAddInstrument,
  onRemoveInstrument,
  loading,
}) => {
  return (
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

      {formData.instruments.map((instrumentEntry, index) => (
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
                disabled={loading}
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
              disabled={loading}
            />

            <IconButton
              onClick={() => onRemoveInstrument(index)}
              disabled={formData.instruments.length <= 1 || loading}
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
        disabled={formData.instruments.length >= 10 || loading}
        size="small"
      >
        Add Another Instrument
      </Button>
    </>
  );
};

InstrumentsEditSection.displayName = "InstrumentsEditSection";

export default InstrumentsEditSection;
