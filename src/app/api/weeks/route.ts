import { NextResponse, type NextRequest } from "next/server";

import { and, eq, asc } from "drizzle-orm";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import { getWeeksRequestSchema } from "@/validators/crudAffair";
import type { GetWeeksRequest } from "@/validators/crudAffair";

// import { getWeekNumber } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const data = await request.json();

  try {
    getWeeksRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const { userId, weekNumber } = data as GetWeeksRequest;

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
          eq(affairsTable.weekNumber, weekNumber),
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
