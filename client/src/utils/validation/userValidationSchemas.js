import * as Yup from "yup";
const passwordValidation = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
  .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
  .matches(/(?=.*\d)/, "Password must contain at least one number")
  .matches(
    /(?=.*[!@#$%^&*])/,
    "Password must contain at least one special character (!@#$%^&*)"
  )
  .required("Password is required");
const emailValidation = Yup.string()
  .email("Invalid email address")
  .required("Email is required");
export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),
  bio: Yup.string().max(500, "Bio must be less than 500 characters"),
  country: Yup.string().max(100, "Country name seems too long"),
  city: Yup.string().max(100, "City name seems too long"),
  birthDate: Yup.date()
    .nullable()
    .max(new Date(), "Birth date cannot be in the future")
    .typeError("Invalid date format for birth date"),
  profilePicture: Yup.string()
    .url("Profile picture must be a valid URL")
    .nullable(),
  instruments: Yup.array()
    .of(
      Yup.object({
        instrument: Yup.string().required("Instrument name is required"),
        experienceInYears: Yup.number()
          .typeError("Experience must be a number")
          .min(0, "Experience cannot be negative")
          .max(99, "Experience seems too high")
          .required("Years of experience are required"),
      })
    )
    .min(1, "Please add at least one instrument")
    .max(10, "You can add a maximum of 10 instruments")
    .required("At least one instrument is required"),
});
export const loginValidationSchema = Yup.object({
  username: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});
export const profileUpdateValidationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),
  bio: Yup.string().max(500, "Bio must be less than 500 characters"),
  location: Yup.object({
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be less than 50 characters"),
    country: Yup.string()
      .min(2, "Country must be at least 2 characters")
      .max(50, "Country must be less than 50 characters"),
    address: Yup.string().max(100, "Address must be less than 100 characters"),
  }),
  instruments: Yup.array()
    .of(
      Yup.object({
        instrument: Yup.string().required("Instrument name is required"),
        experienceInYears: Yup.number()
          .typeError("Experience must be a number")
          .min(0, "Experience cannot be negative")
          .max(99, "Experience seems too high")
          .required("Years of experience are required"),
      })
    )
    .max(10, "You can add a maximum of 10 instruments"),
  genres: Yup.array().of(Yup.string()).max(10, "Maximum 10 genres allowed"),
});
export const passwordChangeValidationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: passwordValidation.notOneOf(
    [Yup.ref("currentPassword")],
    "New password must be different from current password"
  ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm new password is required"),
});
export const contactValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: emailValidation,
  subject: Yup.string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters")
    .required("Subject is required"),
  message: Yup.string()
    .min(20, "Message must be at least 20 characters")
    .max(1000, "Message must be less than 1000 characters")
    .required("Message is required"),
});