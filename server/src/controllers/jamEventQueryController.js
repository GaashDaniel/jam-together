export const buildJamEventQuery = (queryParams) => {
  const {
    search,
    location,
    city,
    genre,
    genres,
    instrument,
    instruments,
    dateFrom,
    dateTo,
  } = queryParams;
  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { "location.city": { $regex: search, $options: "i" } },
      { "location.country": { $regex: search, $options: "i" } },
      { "location.address": { $regex: search, $options: "i" } },
    ];
  }
  if (location) {
    const locationQuery = {
      $or: [
        { "location.city": { $regex: location, $options: "i" } },
        { "location.country": { $regex: location, $options: "i" } },
      ],
    };
    if (query.$or) {
      query.$and = [{ $or: query.$or }, locationQuery];
      delete query.$or;
    } else {
      Object.assign(query, locationQuery);
    }
  }
  if (city) {
    query["location.city"] = { $regex: city, $options: "i" };
  }
  const genreList = [];
  if (genre) {
    genreList.push(genre.toLowerCase());
  }
  if (genres) {
    const genreArray = Array.isArray(genres) ? genres : [genres];
    genreList.push(...genreArray.map((g) => g.toLowerCase()));
  }
  if (genreList.length > 0) {
    query.genres = { $in: genreList };
  }
  const instrumentList = [];
  if (instrument) {
    instrumentList.push(instrument.toLowerCase());
  }
  if (instruments) {
    const instrumentArray = Array.isArray(instruments)
      ? instruments
      : [instruments];
    instrumentList.push(...instrumentArray.map((i) => i.toLowerCase()));
  }
  if (instrumentList.length > 0) {
    query["instruments.instrument"] = { $in: instrumentList };
  }
  const dateQuery = {};
  if (dateFrom) {
    const startDate = new Date(dateFrom);
    startDate.setHours(0, 0, 0, 0);
    dateQuery.$gte = startDate;
  }
  if (dateTo) {
    const endDate = new Date(dateTo);
    endDate.setHours(23, 59, 59, 999);
    dateQuery.$lte = endDate;
  }
  if (Object.keys(dateQuery).length > 0) {
    query.scheduledTo = dateQuery;
  } else {
    query.scheduledTo = { $gte: new Date() };
  }
  return query;
};