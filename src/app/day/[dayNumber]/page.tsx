// server side component
import Image from "next/image";

import { and, eq, asc } from "drizzle-orm";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import { getDateFromDayNumber } from "@/lib/utils";

import EditDialog from "./_components/EditDialog";
import EventCard from "./_components/EventCard";
import TodoCard from "./_components/TodoCard";

type DayPageProps = {
  params: {
    dayNumber: string;
  };
  searchParams: {
    editAffairId?: string;
    isHalfDay?: string;
    accessToken: string;
  };
};

export default async function DayPage({
  params: { dayNumber },
  searchParams: { editAffairId, isHalfDay, accessToken },
}: DayPageProps) {
  const dayNumberInt = parseInt(dayNumber);
  const userId = "f60ff11e-d4e8-4faa-9eae-0c4e9567e48d";
  const todate = getDateFromDayNumber(dayNumberInt);

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
        eq(affairsTable.dayNumber, dayNumberInt),
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
        eq(affairsTable.dayNumber, dayNumberInt),
        eq(affairsTable.type, "event"),
      ),
    )
    .orderBy(asc(affairsTable.order))
    .execute();

  const [editAffair] = await db
    .select({
      id: affairsTable.id,
      title: affairsTable.title,
      order: affairsTable.order,
      color: affairsTable.color,
      type: affairsTable.type,
      time1: affairsTable.time1,
      time2: affairsTable.time2,
      isDone: affairsTable.isDone,
    })
    .from(affairsTable)
    .where(
      // userId as dummy input, or else get error for putting ""
      eq(affairsTable.id, editAffairId ?? userId),
    )
    .execute();

  return (
    <>
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
              <TodoCard
                todos={todos}
                dayNumberInt={dayNumberInt}
                isHalfDay={isHalfDay === "true"}
                accessToken={accessToken}
              />
            </div>
          )}

          {/* Event */}
          {events.length > 0 && (
            <div className="border-1 flex flex-col gap-y-2 rounded-lg border-black bg-[#634d3f] p-4 pb-6 pt-3">
              <div className="pb-1 text-lg font-bold text-zinc-200">Event</div>
              <EventCard
                events={events}
                dayNumberInt={dayNumberInt}
                isHalfDay={isHalfDay === "true"}
                accessToken={accessToken}
              />
            </div>
          )}
        </div>

        {/* Chandler's Image */}
        {todos.length === 0 && events.length === 0 && (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src="/chandler-removebg.png"
              width={360}
              height={360}
              alt="Friends' Chandler's calendar"
            />
          </div>
        )}
      </div>

      {editAffairId && editAffair && (
        <EditDialog
          affairId={editAffair.id}
          dayNumber={dayNumberInt}
          affairTitle={editAffair.title}
          affairOrder={editAffair.order}
          affairColor={editAffair.color}
          affairType={editAffair.type}
          affairTime1={editAffair.time1}
          affairTime2={editAffair.time2}
          affairIsDone={editAffair.isDone}
          isHalfDay={isHalfDay === "true"}
        />
      )}
    </>
  );
}
