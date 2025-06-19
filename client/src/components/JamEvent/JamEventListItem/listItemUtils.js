export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const getInitials = (name) => {
  return (
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?"
  );
};
export const isPastEvent = (scheduledTo) => {
  return new Date(scheduledTo) <= new Date();
};