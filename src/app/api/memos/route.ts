import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { memosTable } from "@/db/schema";
import {
  postMemosRequestSchema,
  updateMemosRequestSchema,
} from "@/validators/crudTypes";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    postMemosRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    await db.insert(memosTable).values(data).execute();
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
    updateMemosRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    for (let i = 0; i < data.length; i++) {
      await db
        .update(memosTable)
        .set({
          title: data[i].title,
          description: data[i].description,
        })
        .where(eq(memosTable.id, data[i].id))
        .execute();
    }
    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const deletedIdArrayToString = request.headers.get("deletedIdArrayToString");
  if (!deletedIdArrayToString) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const deletedIdArray = deletedIdArrayToString.split(",");
  try {
    for (let i = 0; i < deletedIdArray.length; i++) {
      await db
        .delete(memosTable)
        .where(eq(memosTable.id, deletedIdArray[i]))
        .execute();
    }
    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong in db" },
      { status: 500 },
    );
  }
}
