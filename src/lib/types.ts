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
