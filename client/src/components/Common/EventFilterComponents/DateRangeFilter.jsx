import React from "react";
import { Box, Typography, Stack, FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const DateRangeFilter = ({
  filters,
  dateError,
  onDateFromChange,
  onDateToChange,
}) => (
  <Box>
    <Typography variant="subtitle2" gutterBottom>
      Date Range
    </Typography>
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <DatePicker
        label="From"
        value={filters.dateFrom ? new Date(filters.dateFrom) : null}
        onChange={onDateFromChange}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            error: Boolean(dateError),
          },
        }}
      />
      <DatePicker
        label="To"
        value={filters.dateTo ? new Date(filters.dateTo) : null}
        onChange={onDateToChange}
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
            error: Boolean(dateError),
          },
        }}
      />
    </Stack>
    {dateError && (
      <FormHelperText error sx={{ mt: 1 }}>
        {dateError}
      </FormHelperText>
    )}
  </Box>
);
DateRangeFilter.displayName = "DateRangeFilter";
export default DateRangeFilter;