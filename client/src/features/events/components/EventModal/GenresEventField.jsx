import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText,
  Box,
  Chip,
} from "@mui/material";
import { GENRES } from "./eventConstants";
export default function GenresEventField({
  values,
  touched,
  errors,
  handleGenreChange,
  setFieldValue,
  setFieldTouched,
}) {
  return (
    <FormControl fullWidth error={touched.genres && Boolean(errors.genres)}>
      <InputLabel>Genres</InputLabel>
      <Select
        multiple
        value={values.genres}
        onChange={(event) => {
          handleGenreChange(setFieldValue)(event.target.value);
          setFieldTouched("genres", true);
        }}
        input={<OutlinedInput label="Genres" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} size="small" />
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
      {touched.genres && errors.genres && (
        <FormHelperText>{errors.genres}</FormHelperText>
      )}
    </FormControl>
  );
}