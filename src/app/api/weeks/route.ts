import { NextResponse, type NextRequest } from "next/server";

import { and, eq, asc, between } from "drizzle-orm";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import { getWeeksRequestSchema } from "@/validators/crudTypes";
import type { GetWeeksRequest } from "@/validators/crudTypes";
import type { dbAffair, resData } from "@/lib/types";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    getWeeksRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { userId, weekNumber } = data as GetWeeksRequest;

  try {
    const dbAffairs: dbAffair[] = await db
      .select({
        id: affairsTable.id,
        title: affairsTable.title,
        color: affairsTable.color,
        type: affairsTable.type,
        time1: affairsTable.time1,
        time2: affairsTable.time2,
        isDone: affairsTable.isDone,
        order: affairsTable.order,
        monthNumber: affairsTable.monthNumber,
        weekNumber: affairsTable.weekNumber,
        dayNumber: affairsTable.dayNumber,
      })
      .from(affairsTable)
      .where(
        and(
          between(affairsTable.weekNumber, weekNumber - 1, weekNumber + 1),
          eq(affairsTable.userId, userId),
        ),
      )
      .orderBy(asc(affairsTable.order), asc(affairsTable.time2))
      .groupBy(affairsTable.dayNumber)
      .execute();

      const data: resData = {[weekNumber - 1]: {}, [weekNumber]: {}, [weekNumber + 1]: {}};

      dbAffairs.map((affair) => {
        const affairWeekNumber = affair.weekNumber;
        const affairDayNumber = affair.dayNumber;
        if (data[affairWeekNumber][affairDayNumber] === undefined) {
          data[affairWeekNumber][affairDayNumber] = [affair];
        } else {
          data[affairWeekNumber][affairDayNumber].push(affair);
        }
      })
  
      return NextResponse.json({ data }, { status: 200 });

  } catch (error) {

    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );

  }
}
