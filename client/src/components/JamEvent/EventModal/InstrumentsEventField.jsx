import React from "react";
import { FieldArray } from "formik";
import {
  Box,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { JAM_EVENT_INSTRUMENTS } from "../../../constants/instruments.js";
export default function InstrumentsEventField({
  values,
  handleInstrumentChange,
  setFieldValue,
}) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontSize: "1.1rem", mb: 1 }}>
        Instruments Needed
      </Typography>
      <FieldArray name="instruments">
        {({ push, remove }) => (
          <Stack spacing={2}>
            {values.instruments.map((instrument, index) => (
              <Box
                key={index}
                sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
              >
                <FormControl fullWidth size="small">
                  <InputLabel>Instrument</InputLabel>
                  <Select
                    value={instrument.instrument}
                    onChange={(e) => {
                      const newInstruments = [...values.instruments];
                      newInstruments[index] = {
                        ...newInstruments[index],
                        instrument: e.target.value,
                      };
                      handleInstrumentChange(setFieldValue)(
                        newInstruments.map((inst) => inst.instrument)
                      );
                    }}
                    label="Instrument"
                  >
                    {JAM_EVENT_INSTRUMENTS.map((inst) => (
                      <MenuItem key={inst} value={inst}>
                        {inst.charAt(0).toUpperCase() + inst.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <IconButton
                  onClick={() => remove(index)}
                  disabled={values.instruments.length === 1}
                  color="error"
                  size="small"
                >
                  <Remove />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<Add />}
              onClick={() => push({ instrument: "", required: true })}
              variant="outlined"
              size="small"
              sx={{ alignSelf: "flex-start" }}
            >
              Add Instrument
            </Button>
          </Stack>
        )}
      </FieldArray>
    </Box>
  );
}