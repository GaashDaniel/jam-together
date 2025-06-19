import React from "react";
import { Field } from "formik";
import { Stack, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
export default function BasicEventFields({
  values,
  touched,
  errors,
  setFieldValue,
  setFieldTouched,
}) {
  return (
    <Stack spacing={3}>
      <Field name="title">
        {({ field, meta }) => (
          <TextField
            {...field}
            label="Event Title"
            placeholder="e.g., Jazz Night at Central Park"
            fullWidth
            required
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
          />
        )}
      </Field>
      <Field name="content">
        {({ field, meta }) => (
          <TextField
            {...field}
            label="Description"
            placeholder="Describe your jam session, what kind of music you'll play, skill level expected, etc."
            multiline
            rows={3}
            fullWidth
            required
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
          />
        )}
      </Field>
      <DateTimePicker
        label="Date & Time"
        value={values.scheduledTo}
        onChange={(date) => {
          setFieldValue("scheduledTo", date);
          setFieldTouched("scheduledTo", true);
        }}
        format="dd/MM/yyyy HH:mm"
        slotProps={{
          textField: {
            fullWidth: true,
            required: true,
            error: touched.scheduledTo && Boolean(errors.scheduledTo),
            helperText: touched.scheduledTo && errors.scheduledTo,
          },
        }}
      />
    </Stack>
  );
}