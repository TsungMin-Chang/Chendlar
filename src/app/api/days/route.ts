import { NextResponse, type NextRequest } from "next/server";

import { eq, and, between } from "drizzle-orm";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import type { DbEvent } from "@/lib/types";
import {
  getWeekNumber,
  getDayNumber,
  getMonthNumber,
  getDates,
} from "@/lib/utils";
import { postAffairRequestSchema } from "@/validators/crudTypes";
import type { PostAffairRequest } from "@/validators/crudTypes";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    postAffairRequestSchema.safeParse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, title, color, type, time1, time2, isDone } =
    data as PostAffairRequest;

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
      return NextResponse.json("OK", { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong in db" },
        { status: 500 },
      );
    }
  }

  if (type === "event") {
    // event will be sorted by and rendered according to order
    try {
      // step1: get dbEvents that needed to be updated later
      let minTime1 = time1;
      let maxTime2 = time2;
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
          const event = events[i];
          if (event.eventTime1 < minTime1) {
            minTime1 = event.eventTime1;
            checker = true;
          }
          if (event.eventTime2 > maxTime2) {
            maxTime2 = event.eventTime2;
            checker = true;
          }
        }

        if (checker === false) {
          dbEvents = [...events];
        }
      }

      // step 2: insert new event
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

      // step 3: update dbEvents - have not checked
      for (let i = 0; i < dbEvents.length; i++) {
        const dbEvent = dbEvents[i];
        await db
          .update(affairsTable)
          .set({ order: dbEvent.eventOrder + 1 })
          .where(eq(affairsTable.title, dbEvent.eventTitle))
          .execute();
      }

      return NextResponse.json("OK", { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong in db" },
        { status: 500 },
      );
    }
  }
}

// export async function UPDATE(request: NextRequest) {
//   const data = await request.json();

//   try {
//     postAffairRequestSchema.parse(data);
//   } catch (error) {
//     return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//   }

//   const { userId, title, color, type, time1, time2, isDone } =
//     data as PostAffairRequest;

//   // year, month, dayNumber, weekNumber
//   // will have to break event into mutiple days
//   const year = 2024;
//   const month = 6;
//   const weekNumber = 128;
//   const dayNumber = 64;
//   // will have to consider order
//   const order = 0;

//   try {
//     await db
//       .insert(affairsTable)
//       .values({
//         userId,
//         title,
//         color,
//         type,
//         time1,
//         time2,
//         isDone,
//         order,
//         year,
//         month,
//         weekNumber,
//         dayNumber
//       })
//       .execute();
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Something went wrong in db" },
//       { status: 500 },
//     );
//   }

//   return NextResponse.json("OK", { status: 200 });
// }
