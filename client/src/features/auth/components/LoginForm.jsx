import React, { useState } from "react";
import { Formik, Form, useFormik } from "formik";
import {
  TextField,
  Button,
  Stack,
  Alert,
  InputAdornment,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, Login } from "@mui/icons-material";
import { loginValidationSchema } from "../../../utils/validation";
import { useAuth } from "../hooks/useAuth";
export default function LoginForm({ onSuccess }) {
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const result = await login(values);
      if (result.success) {
        onSuccess();
      } else {
        setErrors({ submit: result.error });
      }
      setSubmitting(false);
    },
  });
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Typography variant="h5" gutterBottom align="center">
        Welcome Back!
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mb: 3 }}
      >
        Login to continue to JamTogether
      </Typography>
      {formik.errors.submit && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formik.errors.submit}
        </Alert>
      )}
      <TextField
        fullWidth
        id="username"
        name="username"
        label="Username or Email"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        margin="normal"
        autoComplete="username"
        autoFocus
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        startIcon={<Login />}
        disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
        sx={{ mt: 3, mb: 2 }}
      >
        {formik.isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
}
