// server side component
import { and, eq, asc } from "drizzle-orm";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";

import EventItems from "./_components/EventItems";
import TodoItems from "./_components/TodoItems";

type DayPageProps = {
  params: {
    dayNumber: number;
  };
};

export default async function DayPage({ params: { dayNumber } }: DayPageProps) {
  // console.log(dayNumber);
  const userId = "uuid";
  console.log(userId);

  const todos = await db
    .select({
      id: affairsTable.id,
      title: affairsTable.title,
      color: affairsTable.color,
      type: affairsTable.type,
      time1: affairsTable.time1,
      time2: affairsTable.time2,
      isDone: affairsTable.isDone,
      order: affairsTable.order,
      monthNumber: affairsTable.monthNumber,
      weekNumber: affairsTable.weekNumber,
      dayNumber: affairsTable.dayNumber,
    })
    .from(affairsTable)
    .where(
      and(
        eq(affairsTable.userId, userId),
        eq(affairsTable.dayNumber, dayNumber),
        eq(affairsTable.type, "todo"),
      ),
    )
    .orderBy(asc(affairsTable.time2))
    .execute();

  const events = await db
    .select({
      id: affairsTable.id,
      title: affairsTable.title,
      color: affairsTable.color,
      type: affairsTable.type,
      time1: affairsTable.time1,
      time2: affairsTable.time2,
      isDone: affairsTable.isDone,
      order: affairsTable.order,
      monthNumber: affairsTable.monthNumber,
      weekNumber: affairsTable.weekNumber,
      dayNumber: affairsTable.dayNumber,
    })
    .from(affairsTable)
    .where(
      and(
        eq(affairsTable.userId, userId),
        eq(affairsTable.dayNumber, dayNumber),
        eq(affairsTable.type, "event"),
      ),
    )
    .orderBy(asc(affairsTable.order))
    .execute();

  return (
    <div
      className="flex flex-col gap-y-5 bg-[#442B0D] px-10 py-5"
      style={{ height: "94vh" }}
    >
      <div className="flex flex-col gap-y-6">
        {/* Day Date */}
        <div className="ml-2 text-lg font-bold text-zinc-200">
          July 24, 2024
        </div>

        {/* To do */}
        <div className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3">
          <div className="pb-1 text-lg font-bold text-zinc-200">To do</div>
          <TodoItems todos={todos} />
        </div>

        {/* Event */}
        <div className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3">
          <div className="pb-1 text-lg font-bold text-zinc-200">Event</div>
          <EventItems events={events} />
        </div>
      </div>
    </div>
  );
}
