import { NextResponse, type NextRequest } from "next/server";

import { eq, and, between, gt, lt, max } from "drizzle-orm";

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
      await db
        .delete(affairsTable)
        .where(eq(affairsTable.id, affairId))
        .execute();
      return true;
    } catch (error) {
      return false;
    }
  }

  if (prevType === "event") {
    try {
      // step 1: get dbEvents whose order needs to be updated
      let minTime1 = new Date(deleteEventTime1);
      let maxTime2 = new Date(deleteEventTime2);
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
            eq(affairsTable.time1, new Date(deleteEventTime1)),
            eq(affairsTable.time2, new Date(deleteEventTime2)),
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
      return true;
    } catch (error) {
      return false;
    }
  }
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

  // Call deleteDb function
  const deleteRes = await deleteDb(data);
  if (!deleteRes) {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }

  // Call insertDb function
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
