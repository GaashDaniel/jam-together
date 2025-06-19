import { useState, useRef } from "react";
import { useAuth } from "./useAuth";
import { useNotifications } from "../../../components/Common/NotificationManager";
import { api } from "../../../shared/services";
export const useRegistrationForm = (onSuccess = null) => {
  const [loading, setLoading] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);
  const { register } = useAuth();
  const { showToast } = useNotifications();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    instruments: [{ instrument: "", experienceInYears: "" }],
    birthDate: null,
    country: "",
    city: "",
    profilePicture: "",
    bio: "",
  };
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleProfilePictureSelect(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleProfilePictureSelect = (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      showToast(
        "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.",
        "error"
      );
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("File size must be less than 5MB.", "error");
      return;
    }
    setSelectedImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
    showToast("Image selected successfully!", "success");
  };
  const handleRemoveProfilePicture = () => {
    setSelectedImageFile(null);
    setImagePreview("");
  };
  const handleRegistrationSubmit = async (
    values,
    { setFieldError, setSubmitting }
  ) => {
    try {
      setLoading(true);
      const { confirmPassword, ...userDataToSubmit } = values;
      const birthDateValue = userDataToSubmit.birthDate
        ? new Date(userDataToSubmit.birthDate).toISOString().split("T")[0]
        : undefined;
      const processedInstruments = userDataToSubmit.instruments.map((inst) => ({
        instrument: inst.instrument,
        experienceInYears: parseInt(inst.experienceInYears, 10),
      }));
      const finalUserData = {
        ...userDataToSubmit,
        instruments: processedInstruments.filter((inst) => inst.instrument),
        birthDate: birthDateValue,
      };
      delete finalUserData.confirmPassword;
      await register(finalUserData);
      if (selectedImageFile) {
        try {
          const formData = new FormData();
          formData.append("profilePicture", selectedImageFile);
          await api.post("/upload/profile-picture", formData);
          showToast(
            "Registration and profile picture upload successful! Welcome!",
            "success"
          );
        } catch (uploadError) {
          showToast(
            "Registration successful, but profile picture upload failed. You can upload it later from your profile.",
            "warning"
          );
        }
      } else {
        showToast("Registration successful! Welcome!", "success");
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (error.details) {
        Object.keys(error.details).forEach((field) => {
          setFieldError(field, error.details[field]);
        });
      } else {
        showToast(error.message || "Registration failed", "error");
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  return {
    loading,
    selectedImageFile,
    imagePreview,
    fileInputRef,
    initialValues,
    handleFileSelect,
    handleProfilePictureSelect,
    handleRemoveProfilePicture,
    handleRegistrationSubmit,
  };
};
