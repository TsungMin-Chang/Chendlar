// export type User = {
//   id: string;
//   username: string;
//   passwird: string;
// };

export type DbEvent = {
  eventTitle: string;
  eventOrder: number;
  eventTime1: Date;
  eventTime2: Date;
};

export type DbAffair = {
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

export type ResData = {
  [monthOrWeekNumber: number]: {
    [dayNumber: number]: DbAffair[];
  };
};

export type DbMemo = {
  id: string;
  cardName: string;
  title: string;
  description: string;
};
export type NewMemo = Omit<DbMemo, "id">;

export type DbCards = {
  [cardName: string]: DbMemo[];
};

export type Spending = {
  id: string;
  title: string;
  createdAt: Date;
  tw: number;
  kor: number;
};
