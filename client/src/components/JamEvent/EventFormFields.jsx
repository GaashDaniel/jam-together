import React from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import useTheme from "../../shared/hooks/useTheme";
const EventFormFields = ({
  formData,
  errors,
  availableGenres,
  availableInstruments,
  onChange,
  onGenreChange,
  onInstrumentChange,
  onLocationChange,
}) => {
  const { getTextColor, getThemeColor } = useTheme();
  const textFieldProps = {
    fullWidth: true,
    sx: {
      "& .MuiInputLabel-root": {
        color: getTextColor("secondary"),
      },
      "& .MuiOutlinedInput-root": {
        color: getTextColor("primary"),
        "& fieldset": {
          borderColor: getThemeColor("#e0e0e0", "#424242"),
        },
      },
    },
  };
  return (
    <>
      <TextField
        label="Event Title"
        value={formData.title}
        onChange={(e) => onChange("title", e.target.value)}
        error={!!errors.title}
        helperText={errors.title}
        required
        {...textFieldProps}
      />
      <TextField
        label="Description"
        value={formData.content}
        onChange={(e) => onChange("content", e.target.value)}
        error={!!errors.content}
        helperText={errors.content}
        multiline
        rows={4}
        required
        {...textFieldProps}
      />
      <DateTimePicker
        label="Event Date & Time"
        value={formData.scheduledTo}
        onChange={(newValue) => onChange("scheduledTo", newValue)}
        slotProps={{
          textField: {
            error: !!errors.scheduledTo,
            helperText: errors.scheduledTo,
            required: true,
            ...textFieldProps,
          },
        }}
        minDateTime={new Date()}
      />
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ mb: 1, color: getTextColor("primary") }}
        >
          Location
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="City"
            value={formData.location?.city || ""}
            onChange={(e) => onLocationChange("city", e.target.value)}
            error={!!errors["location.city"]}
            helperText={errors["location.city"]}
            required
            {...textFieldProps}
            sx={{ ...textFieldProps.sx, flex: 1 }}
          />
          <TextField
            label="Country"
            value={formData.location?.country || ""}
            onChange={(e) => onLocationChange("country", e.target.value)}
            error={!!errors["location.country"]}
            helperText={errors["location.country"]}
            required
            {...textFieldProps}
            sx={{ ...textFieldProps.sx, flex: 1 }}
          />
        </Box>
      </Box>
      <Autocomplete
        multiple
        options={availableGenres}
        value={formData.genres || []}
        onChange={(event, newValue) => onGenreChange(newValue)}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Genres"
            placeholder="Add genres..."
            error={!!errors.genres}
            helperText={errors.genres}
            {...textFieldProps}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
              size="small"
              {...getTagProps({ index })}
              key={index}
              sx={{
                backgroundColor: getThemeColor("#f5f5f5", "#404040"),
                color: getTextColor("primary"),
              }}
            />
          ))
        }
      />
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ mb: 1, color: getTextColor("primary") }}
        >
          Instruments Needed
        </Typography>
        <Autocomplete
          multiple
          options={availableInstruments}
          value={formData.instruments?.map((inst) => inst.instrument) || []}
          onChange={(event, newValue) => onInstrumentChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Add instruments..."
              error={!!errors.instruments}
              helperText={
                errors.instruments ||
                "Select instruments needed for this jam session"
              }
              {...textFieldProps}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                size="small"
                {...getTagProps({ index })}
                key={index}
                sx={{
                  backgroundColor: getThemeColor("#e8f5e8", "#1a3d1a"),
                  color: getTextColor("primary"),
                }}
              />
            ))
          }
        />
      </Box>
    </>
  );
};
export default EventFormFields;