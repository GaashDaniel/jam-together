import * as Yup from "yup";
export const searchValidationSchema = Yup.object({
  search: Yup.string().max(100, "Search term must be less than 100 characters"),
  location: Yup.string().max(100, "Location must be less than 100 characters"),
  dateFrom: Yup.date().nullable().typeError("Start date must be a valid date"),
  dateTo: Yup.date()
    .nullable()
    .typeError("End date must be a valid date")
    .when("dateFrom", (dateFrom, schema) =>
      dateFrom
        ? schema.min(dateFrom, "End date must be after start date")
        : schema
    ),
  genres: Yup.array().of(Yup.string()).max(10, "Maximum 10 genres allowed"),
  instruments: Yup.array()
    .of(Yup.string())
    .max(10, "Maximum 10 instruments allowed"),
});