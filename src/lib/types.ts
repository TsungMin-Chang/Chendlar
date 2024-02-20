export type User = {
  id: string;
  username: string;
  email: string;
  provider: "github" | "credentials";
};

export type Affair = {
  id: string;
  userId: string;
  title: string;
  color: string;
  type: string;
  time1: Date;
  time2: Date;
  isDone: boolean;
  order: number;
};