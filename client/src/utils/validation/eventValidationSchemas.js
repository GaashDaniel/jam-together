import * as Yup from "yup";
export const jamEventValidationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  content: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters")
    .required("Description is required"),
  scheduledTo: Yup.date()
    .min(new Date(), "Event date must be in the future")
    .required("Event date is required"),
  location: Yup.object({
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be less than 50 characters")
      .required("City is required"),
    country: Yup.string()
      .min(2, "Country must be at least 2 characters")
      .max(50, "Country must be less than 50 characters")
      .required("Country is required"),
    address: Yup.string().max(100, "Address must be less than 100 characters"),
  }).required("Location is required"),
  genres: Yup.array()
    .of(Yup.string())
    .min(1, "At least 1 genre is required")
    .max(5, "Maximum 5 genres allowed")
    .required("Genres are required"),
  instruments: Yup.array()
    .of(
      Yup.object({
        instrument: Yup.string().required("Instrument is required"),
        required: Yup.boolean().default(true),
      })
    )
    .min(1, "At least one instrument is required")
    .max(10, "Maximum 10 instruments allowed")
    .required("Instruments are required"),
});
export const joinRequestValidationSchema = Yup.object({
  instrument: Yup.string().required("Please select an instrument"),
  content: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters")
    .required("Please provide a message"),
});