import { NextResponse, type NextRequest } from "next/server";

import { and, eq, asc, between } from "drizzle-orm";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import { getMonthsRequestSchema } from "@/validators/crudTypes";
import type { GetMonthsRequest } from "@/validators/crudTypes";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    getMonthsRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, monthNumber } = data as GetMonthsRequest;

  try {
    const affairs = await db
      .select({
        id: affairsTable.id,
        title: affairsTable.title,
        color: affairsTable.color,
        type: affairsTable.type,
        time1: affairsTable.time1,
        time2: affairsTable.time2,
        isDone: affairsTable.isDone,
        order: affairsTable.order,
        frontPointer: affairsTable.frontPointer,
        backPointer: affairsTable.backPointer,
        monthNumber: affairsTable.monthNumber,
        weekNumber: affairsTable.weekNumber,
        dayNumber: affairsTable.dayNumber,
      })
      .from(affairsTable)
      .where(
        and(
          between(affairsTable.monthNumber, monthNumber - 1, monthNumber + 1),
          eq(affairsTable.userId, userId),
        ),
      )
      .orderBy(asc(affairsTable.order))
      .groupBy(affairsTable.dayNumber)
      .execute();
    return NextResponse.json({ data: affairs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }
}
