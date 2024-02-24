import { NextResponse, type NextRequest } from "next/server";

import {
  getAffairsRequestSchema,
  postAffairRequestSchema,
  deleteAffairRequestSchema
} from "@/validators/crudAffair";

import type {
  GetAffairsRequest, 
  PostAffairRequest, 
  DeleteAffairRequest
} from "@/validators/crudAffair";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";
import { and, eq, asc } from "drizzle-orm";


export async function GET(request: NextRequest) {
  const data = await request.json();

  try {
    getAffairsRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const { 
    userId,
    timeString
  } = data as GetAffairsRequest;

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
        timeString: affairsTable.timeString,
        isDone: affairsTable.isDone,
        order: affairsTable.order,
      })
      .from(affairsTable)
      .where(
        and(
          eq(affairsTable.userId, userId),
          eq(affairsTable.timeString, timeString),
        )
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



export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    postAffairRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Bad Request" }, 
      { status: 400 }
    );
  }

  const { 
    userId,
    title,
    color,
    type,
    time1,
    time2,
    isDone
  } = data as PostAffairRequest;

  const timeString = "hihi"; //TODO
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
        timeString,
        isDone,
        order
      })
      .returning({ affairIid: affairsTable.id })
      .execute();

    return NextResponse.json(
      { data: affairIid }, 
      { status: 200 }
    );

  } catch (error) {
    
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );

  }
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();

  try {
    deleteAffairRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Bad Request" },
      { status: 400 }
    );
  }

  const { affairId } = data as DeleteAffairRequest;

  try {
    await db
      .delete(affairsTable)
      .where(
        eq(affairsTable.id, affairId),
      )
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
