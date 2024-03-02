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
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, year, month } = data as GetMonthsRequest;
  
  // TODO 4: get all the affairs of 3 months - maybe using range?
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
        year: affairsTable.year,
        month: affairsTable.month,
        weekNumber: affairsTable.weekNumber,
        dayNumber: affairsTable.dayNumber,
      })
      .from(affairsTable)
      .where(
        and(
          eq(affairsTable.year, year),
          eq(affairsTable.month, month),
          eq(affairsTable.userId, userId),
        ),
      )
      // TODO 3: order by year, month, weeknumber, daynumber, order - small first
      .orderBy(asc(affairsTable.order))
      .execute();
    return NextResponse.json({ data: affairs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }

}
