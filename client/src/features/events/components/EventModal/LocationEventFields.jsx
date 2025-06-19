import React from "react";
import { Field } from "formik";
import { Box, Typography, Grid, TextField } from "@mui/material";
export default function LocationEventFields({
  values,
  handleLocationChange,
  setFieldValue,
}) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontSize: "1.1rem" }}>
        Location
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field name="location.city">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="City"
                placeholder="e.g., New York"
                fullWidth
                required
                onChange={(e) =>
                  handleLocationChange(setFieldValue)("city", e.target.value)
                }
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Field name="location.country">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Country"
                placeholder="e.g., USA"
                fullWidth
                required
                onChange={(e) =>
                  handleLocationChange(setFieldValue)("country", e.target.value)
                }
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Field name="location.address">
            {({ field, meta }) => (
              <TextField
                {...field}
                label="Address (Optional)"
                placeholder="e.g., Central Park Bandshell, My garage, Studio 54"
                fullWidth
                onChange={(e) =>
                  handleLocationChange(setFieldValue)("address", e.target.value)
                }
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
        </Grid>
      </Grid>
    </Box>
  );
}