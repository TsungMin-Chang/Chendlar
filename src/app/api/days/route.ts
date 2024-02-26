import { NextResponse, type NextRequest } from "next/server";

// import { getWeekNumber } from "@/lib/utils";
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
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const { userId, title, color, type, time1, time2, isDone } =
    data as PostAffairRequest;

  const dateString = "hihi"; //TODO
  const year = 2024; // TODO
  const month = 6; //TODO
  const weekNumber = 128; //TODO
  const order = 0; // TODO

  try {
    const affairIid = await db
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
        dateString,
        year,
        month,
        weekNumber,
      })
      .returning({ affairIid: affairsTable.id })
      .execute();

    return NextResponse.json({ data: affairIid }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function UPDATE(request: NextRequest) {
  const data = await request.json();

  try {
    postAffairRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const { userId, title, color, type, time1, time2, isDone } =
    data as PostAffairRequest;

  const dateString = "hihi"; //TODO
  const year = 2024; // TODO
  const month = 6; //TODO
  const weekNumber = 128; //TODO
  const order = 0; // TODO

  try {
    const affairIid = await db
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
        dateString,
        year,
        month,
        weekNumber,
      })
      .returning({ affairIid: affairsTable.id })
      .execute();

    return NextResponse.json({ data: affairIid }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
