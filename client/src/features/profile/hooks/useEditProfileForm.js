import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useToast } from "./useToast";
import { normalizeInstrumentName } from "../constants/instruments.js";
export const useEditProfileForm = (open) => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    instruments: [{ instrument: "", experienceInYears: "" }],
    birthDate: null,
    country: "",
    city: "",
    profilePicture: "",
    bio: "",
  });
  useEffect(() => {
    if (open && user) {
      const matchInstrumentName = (instrumentName) => {
        if (!instrumentName) return "";
        return normalizeInstrumentName(instrumentName);
      };
      const userInstruments =
        user.instruments?.length > 0
          ? user.instruments.map((inst) => {
              const instrumentName =
                typeof inst === "string" ? inst : inst.instrument;
              const experience =
                typeof inst === "string"
                  ? ""
                  : inst.experienceInYears !== undefined &&
                    inst.experienceInYears !== null
                  ? inst.experienceInYears.toString()
                  : "";
              return {
                instrument: matchInstrumentName(instrumentName),
                experienceInYears: experience,
              };
            })
          : [{ instrument: "", experienceInYears: "" }];
      const newFormData = {
        fullName: user.fullName || "",
        instruments: userInstruments,
        birthDate: user.birthDate ? new Date(user.birthDate) : null,
        country: user.country || "",
        city: user.city || "",
        profilePicture: user.profilePicture || "",
        bio: user.bio || "",
      };
      setFormData(newFormData);
      setError(null);
    }
  }, [open, user]);
  const validateForm = useCallback(() => {
    const completeInstruments = formData.instruments.filter(
      (inst) =>
        inst.instrument &&
        inst.experienceInYears !== "" &&
        inst.experienceInYears !== null &&
        inst.experienceInYears !== undefined
    );
    if (completeInstruments.length === 0) {
      setError("Please add at least one complete instrument with experience.");
      return false;
    }
    for (const inst of completeInstruments) {
      const experience = Number(inst.experienceInYears);
      if (isNaN(experience) || experience < 0 || experience > 99) {
        setError("Experience years must be between 0 and 99.");
        return false;
      }
    }
    if (formData.fullName && formData.fullName.length > 100) {
      setError("Full name cannot exceed 100 characters.");
      return false;
    }
    if (formData.bio && formData.bio.length > 500) {
      setError("Bio cannot exceed 500 characters.");
      return false;
    }
    if (formData.country && formData.country.length > 100) {
      setError("Country cannot exceed 100 characters.");
      return false;
    }
    if (formData.city && formData.city.length > 100) {
      setError("City cannot exceed 100 characters.");
      return false;
    }
    if (
      formData.profilePicture &&
      !formData.profilePicture.match(/^https?:\/\/.+/) &&
      !formData.profilePicture.match(/^\/uploads\/profile-pictures\/.+/)
    ) {
      setError("Profile picture must be a valid URL or uploaded file.");
      return false;
    }
    setError(null);
    return true;
  }, [formData]);
  useEffect(() => {
    if (open) {
      setIsFormValid(validateForm());
    }
  }, [formData, open, validateForm]);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleInstrumentChange = (index, field, value) => {
    const newInstruments = [...formData.instruments];
    newInstruments[index] = {
      ...newInstruments[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      instruments: newInstruments,
    }));
  };
  const addInstrument = () => {
    if (formData.instruments.length < 10) {
      setFormData((prev) => ({
        ...prev,
        instruments: [
          ...prev.instruments,
          { instrument: "", experienceInYears: "" },
        ],
      }));
    }
  };
  const removeInstrument = (index) => {
    if (formData.instruments.length > 1) {
      setFormData((prev) => ({
        ...prev,
        instruments: prev.instruments.filter((_, i) => i !== index),
      }));
    }
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return false;
    }
    try {
      setLoading(true);
      setError(null);
      const updateData = { ...formData };
      updateData.instruments = formData.instruments
        .filter(
          (inst) =>
            inst.instrument &&
            inst.experienceInYears !== "" &&
            inst.experienceInYears !== null &&
            inst.experienceInYears !== undefined
        )
        .map((inst) => ({
          instrument: inst.instrument,
          experienceInYears: Number(inst.experienceInYears),
        }));
      if (updateData.birthDate) {
        updateData.birthDate = updateData.birthDate.toISOString().split("T")[0];
      }
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] === "") {
          updateData[key] = null;
        }
      });
      await updateProfile(updateData);
      showToast("Profile updated successfully!", "success");
      return true;
    } catch (error) {
      setError(error.message || "Failed to update profile");
      return false;
    } finally {
      setLoading(false);
    }
  };
  return {
    formData,
    loading,
    error,
    isFormValid,
    setError,
    handleInputChange,
    handleInstrumentChange,
    addInstrument,
    removeInstrument,
    handleSubmit,
    setFormData,
  };
};
