export const getWeekNumber = (myDate: Date) => {
  const baseDay: Date = new Date(2023, 11, 31, 22, 30);
  const dayOfYear = (myDate.valueOf() - baseDay.valueOf()) / 86400000 + 1;
  const weekNumber = Math.ceil(dayOfYear / 7);
  return weekNumber;
};
