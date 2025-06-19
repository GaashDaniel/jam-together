import React from "react";
import { Formik, Form } from "formik";
import {
  Dialog,
  DialogContent,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEventModal } from "../../hooks/useEventModal";
import { jamEventValidationSchema } from "../../utils/validators";
import {
  EventModalHeader,
  BasicEventFields,
  LocationEventFields,
  GenresEventField,
  InstrumentsEventField,
  EventModalActions,
} from "./EventModal";
export default function EditEventModal({
  open,
  onClose,
  event,
  onEventUpdated,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onSuccess = async (updatedEvent) => {
    if (onEventUpdated) {
      await onEventUpdated(updatedEvent);
    }
    onClose();
  };
  const {
    user,
    isSubmitting,
    initialValues,
    handleSubmit,
    handleLocationChange,
    handleGenreChange,
    handleInstrumentChange,
    canSubmit,
  } = useEventModal(event, onSuccess);
  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };
  if (!user || !event) {
    return null;
  }
  if (event.createdBy?._id !== user._id && event.createdBy !== user._id) {
    return null;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        fullScreen={fullScreen}
        PaperProps={{
          sx: { height: fullScreen ? "100%" : "auto", maxHeight: "90vh" },
        }}
      >
        <EventModalHeader
          icon={Edit}
          title="Edit Event"
          subtitle="Update your jam session details"
          onClose={handleClose}
          isSubmitting={isSubmitting}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={jamEventValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            isValid,
            dirty,
          }) => (
            <Form>
              <DialogContent dividers sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <BasicEventFields
                    values={values}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                  <LocationEventFields
                    values={values}
                    handleLocationChange={handleLocationChange}
                    setFieldValue={setFieldValue}
                  />
                  <GenresEventField
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleGenreChange={handleGenreChange}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                  <InstrumentsEventField
                    values={values}
                    handleInstrumentChange={handleInstrumentChange}
                    setFieldValue={setFieldValue}
                  />
                </Stack>
              </DialogContent>
              <EventModalActions
                onClose={handleClose}
                isSubmitting={isSubmitting}
                canSubmit={canSubmit}
                isValid={isValid}
                dirty={dirty}
                submitIcon={Edit}
                submitText="Update Event"
                submitingText="Updating..."
              />
            </Form>
          )}
        </Formik>
      </Dialog>
    </LocalizationProvider>
  );
}