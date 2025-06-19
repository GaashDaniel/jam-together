export const applyGenreFilter = (events, selectedGenre) => {
  if (!selectedGenre) return events;
  return events.filter((event) =>
    event.genres?.includes(selectedGenre.toLowerCase())
  );
};
export const applySearchFilter = (events, searchQuery) => {
  if (!searchQuery) return events;
  const query = searchQuery.toLowerCase();
  return events.filter(
    (event) =>
      event.title?.toLowerCase().includes(query) ||
      event.content?.toLowerCase().includes(query) ||
      event.location?.city?.toLowerCase().includes(query) ||
      event.location?.country?.toLowerCase().includes(query)
  );
};
export const applyPastEventsFilter = (events, showPastEvents) => {
  if (showPastEvents) return events;
  return events.filter((event) => !event.isPastEvent);
};
export const sortEvents = (events, sortBy, sortOrder) => {
  return [...events].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case "eventDate":
        aValue = new Date(a.scheduledTo);
        bValue = new Date(b.scheduledTo);
        break;
      case "title":
        aValue = a.title?.toLowerCase() || "";
        bValue = b.title?.toLowerCase() || "";
        break;
      case "likes":
        aValue = a.likes?.length || 0;
        bValue = b.likes?.length || 0;
        break;
      case "dateAdded":
      default:
        aValue = a.dateAdded;
        bValue = b.dateAdded;
        break;
    }
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};
export const filterAndSortFavorites = (events, filters) => {
  const { selectedGenre, searchQuery, showPastEvents, sortBy, sortOrder } =
    filters;
  let filtered = applyGenreFilter(events, selectedGenre);
  filtered = applySearchFilter(filtered, searchQuery);
  filtered = applyPastEventsFilter(filtered, showPastEvents);
  return sortEvents(filtered, sortBy, sortOrder);
};
export const extractAvailableGenres = (events) => {
  return [...new Set(events.flatMap((event) => event.genres || []))];
};