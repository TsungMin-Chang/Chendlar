export const getDayNumber = (myDate: Date) => {
  const baseDay: Date = new Date(2023, 11, 31, 22, 30);
  const myDateYear = myDate.getFullYear();
  const myDateMonth = myDate.getMonth();
  const myDateDate = myDate.getDate();
  const newMyDate = new Date(myDateYear, myDateMonth, myDateDate, 22, 30);
  const dayNumber = (newMyDate.valueOf() - baseDay.valueOf()) / 86400000 + 1;
  return dayNumber;
}
export const getWeekNumber = (myDate: Date) => {
  const dayNumber = getDayNumber(myDate);
  const weekNumber = Math.ceil(dayNumber / 7);
  return weekNumber;
};
