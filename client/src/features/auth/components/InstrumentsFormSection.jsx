import React from "react";
import { FieldArray, getIn } from "formik";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Stack,
  Divider,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Autocomplete,
  Chip,
} from "@mui/material";
import {
  AddCircleOutline,
  RemoveCircleOutline,
  Add,
  Remove,
} from "@mui/icons-material";
import { COMMON_INSTRUMENTS } from "../../../constants/instruments";
const InstrumentsFormSection = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  return (
    <>
      {}
      <Divider sx={{ my: 2 }}>Your Instruments</Divider>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mb: 1 }}
      >
        Add at least one instrument you play.
      </Typography>
      <FieldArray
        name="instruments"
        render={(arrayHelpers) => (
          <Box>
            {values.instruments.map((instrumentEntry, index) => {
              const instrumentFieldName = `instruments.${index}.instrument`;
              const experienceFieldName = `instruments.${index}.experienceInYears`;
              const instrumentError = getIn(errors, instrumentFieldName);
              const experienceError = getIn(errors, experienceFieldName);
              const instrumentTouched = getIn(touched, instrumentFieldName);
              const experienceTouched = getIn(touched, experienceFieldName);
              return (
                <Box key={index} sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <FormControl
                      fullWidth
                      error={instrumentTouched && Boolean(instrumentError)}
                    >
                      <InputLabel id={`instrument-label-${index}`}>
                        Instrument #{index + 1}
                      </InputLabel>
                      <Select
                        labelId={`instrument-label-${index}`}
                        name={instrumentFieldName}
                        value={instrumentEntry.instrument}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label={`Instrument #${index + 1}`}
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
                      {instrumentTouched && instrumentError && (
                        <FormHelperText>{instrumentError}</FormHelperText>
                      )}
                    </FormControl>
                    <TextField
                      fullWidth
                      name={experienceFieldName}
                      label="Experience (Years)"
                      type="text"
                      inputMode="numeric"
                      value={instrumentEntry.experienceInYears}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={experienceTouched && Boolean(experienceError)}
                      helperText={experienceTouched && experienceError}
                    />
                    <IconButton
                      onClick={() => arrayHelpers.remove(index)}
                      disabled={values.instruments.length <= 1}
                      color="error"
                      sx={{ mt: 1 }}
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  </Stack>
                </Box>
              );
            })}
            <Button
              startIcon={<AddCircleOutline />}
              onClick={() =>
                arrayHelpers.push({
                  instrument: "",
                  experienceInYears: "",
                })
              }
              disabled={values.instruments.length >= 10}
              size="small"
            >
              Add Another Instrument
            </Button>
            {typeof errors.instruments === "string" && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.instruments}
              </Alert>
            )}
          </Box>
        )}
      />
    </>
  );
};
export default InstrumentsFormSection;