import { eq, and } from "drizzle-orm";

import { db } from "@/db";
import { affairsTable } from "@/db/schema";

export const heartTodo = async (todoId: string, todoIsDone: boolean) => {
  await db
    .update(affairsTable)
    .set({ isDone: !todoIsDone })
    .where(eq(affairsTable.id, todoId));

  return;
};

export const deleteTodo = async (todoId: string) => {
  await db.delete(affairsTable).where(eq(affairsTable.id, todoId));

  return;
};

export const deleteEvent = async (
  eventTitle: string,
  eventTime1: Date,
  eventTime2: Date,
) => {
  await db
    .delete(affairsTable)
    .where(
      and(
        eq(affairsTable.title, eventTitle),
        eq(affairsTable.time1, eventTime1),
        eq(affairsTable.time2, eventTime2),
      ),
    );

  return;
};
