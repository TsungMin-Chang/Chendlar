// server side component
// import { eq, asc, sql, and } from "drizzle-orm";
// import { db } from "@/db";
// import { usersTable, affairsTable } from "@/db/schema";

type DayPageProps = {
  params: {
    dayNumber: number;
  };
};

export default async function DayPage({ params: { dayNumber } }: DayPageProps) {
  console.log(dayNumber);

  return <></>;
}
