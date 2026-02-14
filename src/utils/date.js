const getStartOfHour = (date) => {
  const normalizedDate = new Date(date);
  normalizedDate.setMinutes(0, 0, 0);
  return normalizedDate;
};

module.exports = {
  getStartOfHour,
};
