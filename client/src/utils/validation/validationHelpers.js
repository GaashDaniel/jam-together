import * as Yup from "yup";
export const validateEmail = (email) => {
  return Yup.string().email().isValidSync(email);
};
export const validatePassword = (password) => {
  return Yup.string()
    .min(8)
    .matches(/(?=.*[a-z])/) 
    .matches(/(?=.*[A-Z])/) 
    .matches(/(?=.*\d)/) 
    .matches(/(?=.*[!@#$%^&*])/) 
    .isValidSync(password);
};
export const validateUsername = (username) => {
  return Yup.string()
    .min(3)
    .max(20)
    .matches(/^[a-zA-Z0-9_]+$/)
    .isValidSync(username);
};