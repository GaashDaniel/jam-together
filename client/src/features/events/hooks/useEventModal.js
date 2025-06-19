import { useState, useMemo, useCallback } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useToast } from "../../../shared/hooks/useToast";
import { api } from "../../../shared/services";
export const useEventModal = (initialEvent = null, onSuccess = () => {}) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValues = useMemo(() => {
    if (initialEvent) {
      return {
        title: initialEvent.title || "",
        content: initialEvent.content || "",
        genres: initialEvent.genres || [],
        location: {
          city: initialEvent.location?.city || "",
          country: initialEvent.location?.country || "",
          address: initialEvent.location?.address || "",
        },
        scheduledTo: initialEvent.scheduledTo
          ? new Date(initialEvent.scheduledTo)
          : null,
        instruments:
          initialEvent.instruments?.length > 0
            ? initialEvent.instruments.map((inst) => ({
                instrument: typeof inst === "string" ? inst : inst.instrument,
                required: typeof inst === "object" ? inst.required : true,
              }))
            : [{ instrument: "", required: true }],
      };
    }
    return {
      title: "",
      content: "",
      genres: [],
      location: {
        city: "",
        country: "",
        address: "",
      },
      scheduledTo: null,
      instruments: [{ instrument: "", required: true }],
    };
  }, [initialEvent]);
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setIsSubmitting(true);
      const formattedValues = {
        ...values,
        scheduledTo: values.scheduledTo
          ? values.scheduledTo.toISOString()
          : null,
        instruments: values.instruments.filter((inst) => inst.instrument),
      };
      let data;
      if (initialEvent) {
        data = await api.patch(
          `/jamEvents/${initialEvent._id}`,
          formattedValues
        );
        showToast("Event updated successfully!", "success");
      } else {
        data = await api.post("/jamEvents", formattedValues);
        showToast("Jam event created successfully!", "success");
        resetForm();
      }
      onSuccess(data.jamEvent);
    } catch (error) {
      if (
        error.message.includes("validation") ||
        error.message.includes("field")
      ) {
        showToast("Please check all required fields", "error");
      } else {
        showToast(
          error.message ||
            `Failed to ${initialEvent ? "update" : "create"} jam event`,
          "error"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleLocationChange = useCallback(
    (setFieldValue) => (field, value) => {
      setFieldValue(`location.${field}`, value);
    },
    []
  );
  const handleGenreChange = useCallback(
    (setFieldValue) => (newValue) => {
      setFieldValue("genres", newValue);
    },
    []
  );
  const handleInstrumentChange = useCallback(
    (setFieldValue) => (newValue) => {
      const instrumentObjects = newValue.map((instrument) => ({
        instrument,
        required: true,
      }));
      setFieldValue("instruments", instrumentObjects);
    },
    []
  );
  const canSubmit = (isValid, dirty) => {
    return !isSubmitting && isValid && (initialEvent ? true : dirty);
  };
  return {
    user,
    isSubmitting,
    initialValues,
    handleSubmit,
    handleLocationChange,
    handleGenreChange,
    handleInstrumentChange,
    canSubmit,
  };
};
