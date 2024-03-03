import { NextResponse, type NextRequest } from "next/server";
import { getWeekNumber, getDayNumber, getMonthNumber, getDates } from "@/lib/utils";
import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import { postAffairRequestSchema } from "@/validators/crudTypes";
import type { PostAffairRequest } from "@/validators/crudTypes";

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
    // TODO 5: need to find max order so that I can add 1 to it then assign
    try {
      await db
        .insert(affairsTable)
        .values({
          userId,
          title,
          color,
          type,
          time1,
          time2,
          isDone,
          order: 10000000, // TODO 2: will have to consider order for each day
          monthNumber: getMonthNumber(time1),
          weekNumber: getWeekNumber(time1),
          dayNumber: getDayNumber(time1),
        })
        .execute();
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong in db" },
        { status: 500 },
      );
    }
  }
  
  if (type === "event") {
    const dateArray = getDates(time1, time2);
    const eventDbValues = dateArray.map((date) => ({
      userId,
      title,
      color,
      type,
      time1,
      time2,
      isDone,
      order: 10000000, // TODO 2: will have to consider order for each day
      monthNumber: getMonthNumber(date),
      weekNumber: getWeekNumber(date),
      dayNumber: getDayNumber(date),
    }))
    console.log(eventDbValues);
    
    // Drizzle ORM insert mutiple rows
    await db
    .insert(affairsTable)
    .values(eventDbValues)
    .execute();
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
