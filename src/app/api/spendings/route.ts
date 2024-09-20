import { NextResponse, type NextRequest } from "next/server";

import { eq, desc } from "drizzle-orm";
import { sum } from "drizzle-orm";

import { db } from "@/db";
import { spendingsTable } from "@/db/schema";
import type { Spending } from "@/lib/types";
import type {
  PostSpendingRequest,
  UpdateSpendingRequest,
} from "@/validators/crudTypes";
import {
  postSpendingRequestSchema,
  updateSpendingRequestSchema,
} from "@/validators/crudTypes";

export async function GET() {
  try {
    const [{ totalKor }] = await db
      .select({
        totalKor: sum(spendingsTable.kor),
      })
      .from(spendingsTable);

    const [{ totalTw }] = await db
      .select({
        totalTw: sum(spendingsTable.tw),
      })
      .from(spendingsTable);

    const dbSpendings = await db
      .select({
        id: spendingsTable.id,
        title: spendingsTable.title,
        createdAt: spendingsTable.createdAt,
        tw: spendingsTable.tw,
        kor: spendingsTable.kor,
      })
      .from(spendingsTable)
      .orderBy(desc(spendingsTable.createdAt))
      .execute();

    const data: { [key: string]: Spending[] } = {};
    for (const spending of dbSpendings) {
      const day = new Date(spending.createdAt).toDateString();
      if (!Object.keys(data).includes(day)) {
        data[day] = [spending];
      } else {
        data[day].push(spending);
      }
    }

    const eachDayTotal: { [day: string]: { [country: string]: number } } = {};
    for (const day of Object.keys(data)) {
      eachDayTotal[day] = { kor: 0, tw: 0 };
      for (const spending of data[day]) {
        eachDayTotal[day]["kor"] += spending.kor;
        eachDayTotal[day]["tw"] += spending.tw;
      }
    }

    return NextResponse.json(
      { data, eachDayTotal, totalKor: totalKor ?? 0, totalTw: totalTw ?? 0 },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    postSpendingRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { title, tw, kor } = data as PostSpendingRequest;

  try {
    await db
      .insert(spendingsTable)
      .values({
        title,
        tw,
        kor,
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

export async function PUT(request: NextRequest) {
  const data = await request.json();

  try {
    updateSpendingRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { title, kor, tw, id } = data as UpdateSpendingRequest;

  try {
    await db
      .update(spendingsTable)
      .set({ title, kor, tw })
      .where(eq(spendingsTable.id, id))
      .execute();
    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const spendingId = request.headers.get("spendingId");
  if (!spendingId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    await db
      .delete(spendingsTable)
      .where(eq(spendingsTable.id, spendingId))
      .execute();
    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }
}
