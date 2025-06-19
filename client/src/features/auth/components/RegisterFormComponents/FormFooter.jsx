import React from "react";
import { Button, Typography } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
const FormFooter = ({ formikBag, onSwitchToLogin }) => {
  const { isSubmitting, isValid, dirty } = formikBag;
  return (
    <>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        startIcon={<PersonAdd />}
        disabled={isSubmitting || !isValid || !dirty}
        sx={{ mt: 3, mb: 2 }}
      >
        {isSubmitting ? "Creating Account..." : "Register"}
      </Button>
      <Typography variant="body2" align="center">
        Already have an account?{" "}
        <Button onClick={onSwitchToLogin} sx={{ textTransform: "none" }}>
          Login here
        </Button>
      </Typography>
    </>
  );
};
FormFooter.displayName = "FormFooter";
export default FormFooter;