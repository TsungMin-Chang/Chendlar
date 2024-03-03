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

export const getMonthNumber = (myDate: Date) => {
  const baseMonth: Date = new Date(2024, 0, 1, 22, 30);
  const myDateYear = myDate.getFullYear();
  const myDateMonth = myDate.getMonth();
  const monthNumber = (myDateYear - baseMonth.getFullYear()) * 12 + (myDateMonth + 1);
  return monthNumber;
}

declare global {
  interface Date {
    addDays (days: number) : Date
  }
}

Date.prototype.addDays = function(days: number) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export const getDates = (startDate: Date, stopDate: Date) => {
  const dateArray: Date[] = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}
