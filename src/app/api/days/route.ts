import { NextResponse, type NextRequest } from "next/server";

import { eq, and, between, min } from "drizzle-orm";

import {
  deleteTodo,
  deleteEvent,
} from "@/app/day/[dayNumber]/_components/actions";
import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import type { DbEvent } from "@/lib/types";
import {
  getWeekNumber,
  getDayNumber,
  getMonthNumber,
  getDates,
} from "@/lib/utils";
import {
  postAffairRequestSchema,
  updateAffairRequestSchema,
} from "@/validators/crudTypes";
import type {
  PostAffairRequest,
  UpdateAffairRequest,
} from "@/validators/crudTypes";

async function insertDb(data: PostAffairRequest) {
  const { userId, title, color, type, time1, time2, isDone } = data;

  if (type === "todo") {
    // todo is given very large order and will later be sorted by time2
    try {
      await db
        .insert(affairsTable)
        .values({
          userId,
          title,
          color,
          type,
          isDone,
          time1: new Date(time1),
          time2: new Date(time2),
          order: 100,
          monthNumber: getMonthNumber(time1),
          weekNumber: getWeekNumber(time1),
          dayNumber: getDayNumber(time1),
        })
        .execute();
      return true;
    } catch (error) {
      return false;
    }
  }

  if (type === "event") {
    // event will be sorted by and rendered according to order

    const [{ order: nextOrder }] = await db
      .select({
        order: min(affairsTable.order),
      })
      .from(affairsTable)
      .where(
        and(
          eq(affairsTable.type, "event"),
          between(
            affairsTable.dayNumber,
            getDayNumber(time1),
            getDayNumber(time2),
          ),
        ),
      );

    if (nextOrder === null || (nextOrder !== null && nextOrder > 0)) {
      // insert the new event directly - no other events need changing

      try {
        const insertDataArray = [];
        const dateArray = getDates(time1, time2);
        for (let i = 0; i < dateArray.length; i++) {
          const date = dateArray[i];
          insertDataArray.push({
            ...data,
            time1: new Date(time1),
            time2: new Date(time2),
            order: nextOrder === null ? 0 : nextOrder - 1,
            monthNumber: getMonthNumber(date),
            weekNumber: getWeekNumber(date),
            dayNumber: getDayNumber(date),
          });
        }
        await db.insert(affairsTable).values(insertDataArray).execute();
        return true;
      } catch (error) {
        return false;
      }
    }

    if (nextOrder !== null && nextOrder === 0) {
      // insert the new event and handle the side effect

      try {
        // step1: get dbEvents that needed to be updated later
        let minTime1 = new Date(time1);
        let maxTime2 = new Date(time2);
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
            dbEvents = [...events];
          }
        }

        // step 2: insert the new event
        const insertDataArray = [];
        const dateArray = getDates(time1, time2);
        for (let i = 0; i < dateArray.length; i++) {
          const date = dateArray[i];
          insertDataArray.push({
            ...data,
            time1: new Date(time1),
            time2: new Date(time2),
            order: 0,
            monthNumber: getMonthNumber(date),
            weekNumber: getWeekNumber(date),
            dayNumber: getDayNumber(date),
          });
        }
        await db.insert(affairsTable).values(insertDataArray).execute();

        // step 3: update dbEvents
        for (let i = 0; i < dbEvents.length; i++) {
          const dbEvent = dbEvents[i];
          await db
            .update(affairsTable)
            .set({ order: dbEvent.eventOrder + 1 })
            .where(
              and(
                eq(affairsTable.title, dbEvent.eventTitle),
                eq(affairsTable.time1, dbEvent.eventTime1),
                eq(affairsTable.time2, dbEvent.eventTime2),
              ),
            )
            .execute();
        }
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}

async function deleteDb(data: UpdateAffairRequest) {
  const {
    affairId,
    prevType,
    prevTitle: deleteEventTitle,
    prevOrder: deleteEventOrder,
    prevTime1: deleteEventTime1,
    prevTime2: deleteEventTime2,
  } = data;

  if (prevType === "todo") {
    try {
      await deleteTodo(affairId);
    } catch (error) {
      return false;
    }
    return true;
  }

  if (prevType === "event") {
    try {
      await deleteEvent(
        deleteEventTitle,
        deleteEventOrder,
        deleteEventTime1,
        deleteEventTime2,
      );
    } catch (error) {
      return false;
    }
    return true;
  }
}

async function fastUpdate(data: UpdateAffairRequest) {
  const {
    affairId,
    type,
    prevType,
    time1,
    time2,
    prevTime1,
    prevTime2,
    title,
    prevTitle,
    color,
    isDone,
  } = data;

  // todo
  if (prevType === "todo" && type === "todo") {
    try {
      await db
        .update(affairsTable)
        .set({
          title,
          color,
          time1: new Date(time1),
          time2: new Date(time2),
          isDone,
          monthNumber: getMonthNumber(time1),
          weekNumber: getWeekNumber(time1),
          dayNumber: getDayNumber(time1),
        })
        .where(eq(affairsTable.id, affairId))
        .execute();
      return true;
    } catch (error) {
      return false;
    }
  }

  // event
  if (
    prevType === "event" &&
    type === "event" &&
    new Date(time1).getTime() === new Date(prevTime1).getTime() &&
    new Date(time2).getTime() === new Date(prevTime2).getTime()
  ) {
    try {
      await db
        .update(affairsTable)
        .set({ title, color })
        .where(
          and(
            eq(affairsTable.title, prevTitle),
            eq(affairsTable.time1, new Date(prevTime1)),
            eq(affairsTable.time2, new Date(prevTime2)),
          ),
        )
        .execute();
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postAffairRequestSchema.safeParse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Call insertDb function
  const res = await insertDb(data);
  if (res) {
    return NextResponse.json("OK", { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateAffairRequestSchema.safeParse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // fast update
  const fastUpdateRes = await fastUpdate(data);
  if (fastUpdateRes) {
    return NextResponse.json("OK", { status: 200 });
  }

  // regular update - step 1: deleteDb function
  const deleteRes = await deleteDb(data);
  if (!deleteRes) {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }

  // regular update - step 2: insertDb function
  const insertRes = await insertDb(data);
  if (insertRes) {
    return NextResponse.json("OK", { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }
}
