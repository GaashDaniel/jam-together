export const formatDateTime = (dateTime) => {
  if (!dateTime) return "";
  const date = new Date(dateTime);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 0) {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (diffInMinutes < 60) {
    return diffInMinutes < 1 ? "Just now" : `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else {
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
export const formatTime = (time) => {
  if (!time) return "";
  return new Date(time).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};
export const capitalize = (str) => {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
export const formatNumber = (num) => {
  if (typeof num !== "number") return "0";
  return num.toLocaleString();
};
export const formatList = (items, maxItems = 3) => {
  if (!Array.isArray(items) || items.length === 0) return "";
  if (items.length <= maxItems) {
    return items.join(", ");
  }
  const visibleItems = items.slice(0, maxItems);
  const remainingCount = items.length - maxItems;
  return `${visibleItems.join(", ")} +${remainingCount} more`;
};
export const getTimeUntilEvent = (eventDate) => {
  if (!eventDate) return "";
  const now = new Date();
  const event = new Date(eventDate);
  const diffInMs = event - now;
  if (diffInMs < 0) {
    return "Event has passed";
  }
  return formatTimeDifference(diffInMs);
};
const formatTimeDifference = (diffInMs) => {
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} to go`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} to go`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} to go`;
  } else {
    return "Starting soon!";
  }
};
export const generateColor = (seed) => {
  if (!seed) return "#9e9e9e";
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];
  return colors[Math.abs(hash) % colors.length];
};
export const getProfilePictureUrl = (profilePicture) => {
  if (!profilePicture) return "";
  if (
    profilePicture.startsWith("http://") ||
    profilePicture.startsWith("https://")
  ) {
    return profilePicture;
  }
  if (profilePicture.startsWith("/uploads/")) {
    const serverUrl =
      import.meta.env.VITE_API_URL?.replace("/api", "") ||
      "http://localhost:5000";
    const fullUrl = `${serverUrl}${profilePicture}`;
    return fullUrl;
  }
  return profilePicture;
};
