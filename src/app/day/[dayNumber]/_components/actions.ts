import { eq, and, between, gt, lt, max } from "drizzle-orm";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import type { DbEvent } from "@/lib/types";
import { getDayNumber } from "@/lib/utils";

export const heartTodo = async (todoId: string, todoIsDone: boolean) => {
  await db
    .update(affairsTable)
    .set({ isDone: !todoIsDone })
    .where(eq(affairsTable.id, todoId));

  return;
};

export const deleteTodo = async (todoId: string) => {
  await db.delete(affairsTable).where(eq(affairsTable.id, todoId));
  return;
};

export const deleteEvent = async (
  deleteEventTitle: string,
  deleteEventOrder: number,
  deleteEventTime1: Date,
  deleteEventTime2: Date,
) => {
  // step 1: get dbEvents whose order needs to be updated
  let minTime1 = deleteEventTime1;
  let maxTime2 = deleteEventTime2;
  let dbEvents: DbEvent[] = [];
  let checker = true;

  while (checker) {
    checker = false;

    const events = await db
      .selectDistinctOn([affairsTable.title], {
        eventTitle: affairsTable.title,
        eventOrder: affairsTable.order,
        eventTime1: affairsTable.time1,
        eventTime2: affairsTable.time2,
      })
      .from(affairsTable)
      .where(
        and(
          eq(affairsTable.type, "event"),
          gt(affairsTable.order, deleteEventOrder),
          between(
            affairsTable.dayNumber,
            getDayNumber(minTime1),
            getDayNumber(maxTime2),
          ),
        ),
      )
      .execute();

    for (let i = 0; i < events.length; i++) {
      const eventTime1 = new Date(events[i].eventTime1);
      const eventTime2 = new Date(events[i].eventTime2);
      if (eventTime1 < minTime1) {
        minTime1 = eventTime1;
        checker = true;
      }
      if (eventTime2 > maxTime2) {
        maxTime2 = eventTime2;
        checker = true;
      }
    }

    if (checker === false) {
      dbEvents = events.sort((a, b) => a.eventOrder - b.eventOrder);
    }
  }

  // step 2: delete event
  await db
    .delete(affairsTable)
    .where(
      and(
        eq(affairsTable.title, deleteEventTitle),
        eq(affairsTable.time1, deleteEventTime1),
        eq(affairsTable.time2, deleteEventTime2),
      ),
    );

  // step 3: update dbEvents
  for (let i = 0; i < dbEvents.length; i++) {
    const dbEvent = dbEvents[i];

    const [{ order: prevOrder }] = await db
      .select({
        order: max(affairsTable.order),
      })
      .from(affairsTable)
      .where(
        and(
          eq(affairsTable.type, "event"),
          lt(affairsTable.order, dbEvent.eventOrder),
          between(
            affairsTable.dayNumber,
            getDayNumber(dbEvent.eventTime1),
            getDayNumber(dbEvent.eventTime2),
          ),
        ),
      );

    await db
      .update(affairsTable)
      .set({ order: prevOrder === null ? 0 : prevOrder + 1 })
      .where(
        and(
          eq(affairsTable.title, dbEvent.eventTitle),
          eq(affairsTable.time1, dbEvent.eventTime1),
          eq(affairsTable.time2, dbEvent.eventTime2),
        ),
      )
      .execute();
  }

  return;
};
