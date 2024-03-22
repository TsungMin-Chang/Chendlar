export const getDayNumber = (reqDate: Date) => {
  const myDate = new Date(reqDate);
  const baseDay: Date = new Date(2023, 11, 31, 22, 30);
  const myDateYear = myDate.getFullYear();
  const myDateMonth = myDate.getMonth();
  const myDateDate = myDate.getDate();
  const newMyDate = new Date(myDateYear, myDateMonth, myDateDate, 22, 30);
  const dayNumber = (newMyDate.valueOf() - baseDay.valueOf()) / 86400000 + 1;
  return dayNumber;
};
export const getWeekNumber = (reqDate: Date) => {
  const myDate = new Date(reqDate);
  const dayNumber = getDayNumber(myDate);
  const weekNumber = Math.ceil(dayNumber / 7);
  return weekNumber;
};

export const getMonthNumber = (reqDate: Date) => {
  const myDate = new Date(reqDate);
  const baseMonth: Date = new Date(2024, 0, 1, 22, 30);
  const myDateYear = myDate.getFullYear();
  const myDateMonth = myDate.getMonth();
  const monthNumber =
    (myDateYear - baseMonth.getFullYear()) * 12 + (myDateMonth + 1);
  return monthNumber;
};

declare global {
  interface Date {
    addDays(days: number): Date;
  }
}

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const getDates = (reqStartDate: Date, reqStopDate: Date) => {
  const startDate = new Date(reqStartDate);
  const stopDate = new Date(reqStopDate);
  const dateArray: Date[] = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
};
