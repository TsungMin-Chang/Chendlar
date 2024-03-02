import { NextResponse, type NextRequest } from "next/server";

// import { getWeekNumber, getDayNumber } from "@/lib/utils";
// import { and, eq, asc } from "drizzle-orm";
import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import { postAffairRequestSchema } from "@/validators/crudAffair";
import type { PostAffairRequest } from "@/validators/crudAffair";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    postAffairRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, title, color, type, time1, time2, isDone } =
    data as PostAffairRequest;

  // year, month, dayNumber, weekNumber
  // TODO 1: will have to break event into mutiple days
  const year = 2024;
  const month = 6;
  const weekNumber = 128;
  const dayNumber = 64;
  // TODO 2: will have to consider order for each day
  const order = 0;

  try {
    await db
      // might be mutiple inserts
      .insert(affairsTable)
      .values({
        userId,
        title,
        color,
        type,
        time1,
        time2,
        isDone,
        order,
        year,
        month,
        weekNumber,
        dayNumber
      })
      .execute();

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }

  return NextResponse.json("OK", { status: 200 });
}

export async function UPDATE(request: NextRequest) {
  const data = await request.json();

  try {
    postAffairRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, title, color, type, time1, time2, isDone } =
    data as PostAffairRequest;

  // year, month, dayNumber, weekNumber
  // will have to break event into mutiple days
  const year = 2024;
  const month = 6;
  const weekNumber = 128;
  const dayNumber = 64;
  // will have to consider order
  const order = 0;

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
        order,
        year,
        month,
        weekNumber,
        dayNumber
      })
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }
  
  return NextResponse.json("OK", { status: 200 });
}
