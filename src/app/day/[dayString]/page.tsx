// import { eq, asc, sql, and } from "drizzle-orm";
// import { db } from "@/db";
// import { usersTable, affairsTable } from "@/db/schema";

type DayPageProps = {
  params: {
    dayString: string;
  };
};

export default async function DayPage({ params: { dayString } }: DayPageProps) {
  console.log(dayString);

  return <></>;
}
