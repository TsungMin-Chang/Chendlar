export type User = {
  id: string;
  username: string;
  passwird: string;
};

export type Affair = {
  id: string;
  userId: string;
  title: string;
  color: string;
  type: string;
  time1: Date;
  time2: Date;
  dateString: string;
  isDone: boolean;
  order: number;
};

export type DbEvent = {
  eventTitle: string;
  eventOrder: number;
  eventTime1: Date;
  eventTime2: Date;
};

export type dbAffair = {
  id: string;
  title: string;
  color: string;
  type: string;
  time1: Date;
  time2: Date;
  isDone: boolean;
  order: number;
  monthNumber: number;
  weekNumber: number;
  dayNumber: number;
};

export type resData = {
  [monthOrWeekNumber: number]: {
    [dayNumber: number]: dbAffair[];
  };
};
