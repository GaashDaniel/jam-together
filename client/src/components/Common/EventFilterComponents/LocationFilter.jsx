import React from "react";
import { TextField } from "@mui/material";
const LocationFilter = ({ locationInput, onChange }) => (
  <TextField
    label="Location"
    value={locationInput}
    onChange={onChange}
    placeholder="City or country"
    fullWidth
    size="small"
  />
);
LocationFilter.displayName = "LocationFilter";
export default LocationFilter;