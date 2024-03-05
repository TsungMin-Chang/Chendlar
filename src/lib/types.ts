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

export type dbAffair = {
  id: string;
  userId: string;
  title: string;
  color: string;
  type: string;
  time1: Date;
  time2: Date;
  isDone: boolean;
  order: number;
  dateString: string;
  year: number;
  month: number;
  weekNumber: number;
};

export type DbEvent = {
  eventTitle: string;
  eventOrder: number;
  eventTime1: Date;
  eventTime2: Date;
}
