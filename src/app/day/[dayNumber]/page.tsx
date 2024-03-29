// server side component
import Image from "next/image";

import { and, eq, asc } from "drizzle-orm";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import { getDateFromDayNumber } from "@/lib/utils";

import EventItems from "./_components/EventItems";
import TodoItems from "./_components/TodoItems";

type DayPageProps = {
  params: {
    dayNumber: string;
  };
};

export default async function DayPage({ params: { dayNumber } }: DayPageProps) {
  const userId = "89eb1010-ca1e-414a-a3f2-3b35a994c4a6";
  const todate = getDateFromDayNumber(parseInt(dayNumber));

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
        eq(affairsTable.dayNumber, parseInt(dayNumber)),
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
        eq(affairsTable.dayNumber, parseInt(dayNumber)),
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
        {/* Date */}
        <div className="ml-2 text-lg font-bold text-zinc-200">
          {todate.getFullYear === new Date().getFullYear
            ? todate.toLocaleDateString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
              })
            : todate.toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
        </div>

        {/* To-do */}
        {todos.length > 0 && (
          <div className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3">
            <div className="pb-1 text-lg font-bold text-zinc-200">To do</div>
            <TodoItems todos={todos} />
          </div>
        )}

        {/* Event */}
        {events.length > 0 && (
          <div className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3">
            <div className="pb-1 text-lg font-bold text-zinc-200">Event</div>
            <EventItems events={events} />
          </div>
        )}
      </div>

      {/* No To-do and no Event */}
      {todos.length === 0 && events.length === 0 && (
        <div className="mb-18 flex h-full w-full items-center justify-center">
          <Image
            src="/chandler-removebg.png"
            width={500}
            height={500}
            alt="Friends' Chandler's calendar"
          />
        </div>
      )}
    </div>
  );
}
