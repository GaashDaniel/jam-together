export const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "approved":
      return "success";
    case "denied":
      return "error";
    default:
      return "default";
  }
};
export const processRequestStats = (requestStats) => {
  const requestStatsData = requestStats
    .filter(
      (stat) => stat._id && ["pending", "approved", "denied"].includes(stat._id)
    )
    .reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});
  const defaultStats = { pending: 0, approved: 0, denied: 0 };
  return { ...defaultStats, ...requestStatsData };
};
export const formatResponseTime = (hours) => {
  return hours < 24
    ? `${hours.toFixed(1)} hours`
    : `${(hours / 24).toFixed(1)} days`;
};