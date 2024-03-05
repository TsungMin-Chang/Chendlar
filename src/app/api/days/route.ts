import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import { eq, isNull, and, between } from "drizzle-orm";
import {
  getWeekNumber,
  getDayNumber,
  getMonthNumber,
  getDates,
} from "@/lib/utils";
import { postAffairRequestSchema } from "@/validators/crudTypes";
import type { PostAffairRequest } from "@/validators/crudTypes";
import type { DbEvent } from "@/lib/types";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    postAffairRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, title, color, type, time1, time2, isDone } =
    data as PostAffairRequest;

  if (type === "todo") {
    try {
      const [{lastId}] = await db
        .select({
          lastId: affairsTable.id
        })
        .from(affairsTable)
        .where(
          and(
            eq(affairsTable.dayNumber, getDayNumber(time1)),
            isNull(affairsTable.backPointer)
          )
        )
        .execute();
      
      const [{insertedId}] = await db
        .insert(affairsTable)
        .values({
          userId,
          title,
          color,
          type,
          time1,
          time2,
          isDone,
          order: 100,
          frontPointer: lastId ?? null,
          backPointer: null,
          monthNumber: getMonthNumber(time1),
          weekNumber: getWeekNumber(time1),
          dayNumber: getDayNumber(time1),
        })
        .returning({ insertedId: affairsTable.id })
        .execute();
      
      await db
        .update(affairsTable)
        .set({ backPointer: insertedId })
        .where(eq(affairsTable.id, lastId))
        .execute();

    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong in db" },
        { status: 500 },
      );
    }
  }

  if (type === "event") {
    try {

      // get dbEvents that needed to be updated later
      let minTime1 = time1;
      let maxTime2 = time2;
      let dbEvents: DbEvent[] | null = null; 
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
              between(affairsTable.dayNumber, getDayNumber(minTime1), getDayNumber(maxTime2))
            )
          )
          .execute();
      
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          if(event.eventTime1 < minTime1) {
            minTime1 = event.eventTime1;
            checker = true;
          }
          if(event.eventTime2 > maxTime2) {
            maxTime2 = event.eventTime2;
            checker = true;
          }
        };

        if (checker === false) {
          dbEvents = [...events];
        }
      }

      // insert new event
      const dateArray = getDates(time1, time2);
      for (let i = 0; i < dateArray.length; i++) {
        const date = dateArray[i];

        const [{firstId}] = await db  // might error?
          .select({
            firstId: affairsTable.id
          })
          .from(affairsTable)
          .where(
            and(
              eq(affairsTable.dayNumber, getDayNumber(date)),
              isNull(affairsTable.frontPointer)
            )
          )
          .execute();

        const [{insertedId}] = await db
          .insert(affairsTable)
          .values({
            userId,
            title,
            color,
            type,
            time1,
            time2,
            isDone,
            order: 0,
            frontPointer: null,
            backPointer: firstId ?? null,
            monthNumber: getMonthNumber(date),
            weekNumber: getWeekNumber(date),
            dayNumber: getDayNumber(date),
          })
          .returning({ insertedId: affairsTable.id })
          .execute();
        
        await db
          .update(affairsTable)
          .set({ frontPointer: insertedId })
          .where(eq(affairsTable.id, firstId))
          .execute();
      }

      // update dbEvents
      if (dbEvents) {
        for (let i = 0; i < dbEvents.length; i++) {
          const dbEvent = dbEvents[i];
          await db
            .update(affairsTable)
            .set({ order: dbEvent.eventOrder + 1 })
            .where(eq(affairsTable.title, dbEvent.eventTitle))
            .execute(); 
        }
      }

    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong in db" },
        { status: 500 },
      );
    }
  }
  return NextResponse.json("OK", { status: 200 });
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
