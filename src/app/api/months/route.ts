import { NextResponse, type NextRequest } from "next/server";

import { and, eq, asc } from "drizzle-orm";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import { getMonthsRequestSchema } from "@/validators/crudAffair";
import type { GetMonthsRequest } from "@/validators/crudAffair";

export async function GET(request: NextRequest) {
  const data = await request.json();

  try {
    getMonthsRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const { userId, year, month } = data as GetMonthsRequest;
  // use composite index
  console.log(year);
  console.log(month);

  // make sure what you want to send to client
  try {
    const affairs = await db
      .select({
        id: affairsTable.id,
        userId: affairsTable.userId,
        title: affairsTable.title,
        color: affairsTable.color,
        type: affairsTable.type,
        time1: affairsTable.time1,
        time2: affairsTable.time2,
        dateString: affairsTable.dateString,
        isDone: affairsTable.isDone,
        order: affairsTable.order,
      })
      .from(affairsTable)
      .where(
        and(
          eq(affairsTable.userId, userId),
          // eq(affairsTable.dateString, dateString),
        ),
      )
      .orderBy(asc(affairsTable.order))
      .execute();

    return NextResponse.json({ data: affairs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
