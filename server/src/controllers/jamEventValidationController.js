export const validateJamEventData = (eventData) => {
  const { title, content, genres, location, scheduledTo, instruments } =
    eventData;
  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return {
      isValid: false,
      error: "Title must be at least 3 characters long",
    };
  }
  if (title.length > 200) {
    return { isValid: false, error: "Title cannot exceed 200 characters" };
  }
  if (content && (typeof content !== "string" || content.length > 2000)) {
    return { isValid: false, error: "Content cannot exceed 2000 characters" };
  }
  if (!scheduledTo) {
    return { isValid: false, error: "Event date is required" };
  }
  const eventDate = new Date(scheduledTo);
  if (isNaN(eventDate.getTime())) {
    return { isValid: false, error: "Invalid event date format" };
  }
  if (eventDate <= new Date()) {
    return { isValid: false, error: "Event date must be in the future" };
  }
  if (
    genres &&
    (!Array.isArray(genres) || genres.some((g) => typeof g !== "string"))
  ) {
    return { isValid: false, error: "Genres must be an array of strings" };
  }
  if (location) {
    const { country, city, address } = location;
    if (country && (typeof country !== "string" || country.length > 100)) {
      return {
        isValid: false,
        error: "Country name cannot exceed 100 characters",
      };
    }
    if (city && (typeof city !== "string" || city.length > 100)) {
      return {
        isValid: false,
        error: "City name cannot exceed 100 characters",
      };
    }
    if (address && (typeof address !== "string" || address.length > 200)) {
      return { isValid: false, error: "Address cannot exceed 200 characters" };
    }
  }
  if (instruments) {
    if (!Array.isArray(instruments) || instruments.length === 0) {
      return { isValid: false, error: "At least one instrument is required" };
    }
    for (const instrument of instruments) {
      if (!instrument.instrument || typeof instrument.instrument !== "string") {
        return { isValid: false, error: "Invalid instrument name" };
      }
    }
  }
  return { isValid: true };
};