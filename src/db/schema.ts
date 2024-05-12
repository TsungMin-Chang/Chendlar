import { sql } from "drizzle-orm";
import {
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
  pgTable,
  index,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  username: varchar("username", { length: 64 }).notNull(),
  password: varchar("password", { length: 64 }).notNull(),
});

export const affairsTable = pgTable(
  "affairs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    title: varchar("title", { length: 64 }).notNull(),
    color: varchar("color", { length: 8 }).notNull(),
    type: varchar("type", { length: 8 }).notNull(),
    time1: timestamp("time1", { mode: "date" }).notNull(),
    time2: timestamp("time2", { mode: "date" }).notNull(),
    isDone: boolean("is_done").notNull(),
    order: integer("order").notNull(),
    monthNumber: integer("month_number").notNull(),
    weekNumber: integer("week_number").notNull(),
    dayNumber: integer("day_number").notNull(),
  },
  (table) => ({
    monthNumberIndex: index("month_number_index").on(table.monthNumber),
    dayNumberIndex: index("day_number_index").on(table.dayNumber),
    typeAndOrderIndex: index("type_and_order_index").on(
      table.type,
      table.order,
    ),
  }),
);

export const cardsTable = pgTable("cards", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").default(sql`now()`),
  name: varchar("name", { length: 32 }).notNull().unique(),
});

export const memosTable = pgTable(
  "memos",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    cardName: varchar("card_name", { length: 32 })
      .notNull()
      .references(() => cardsTable.name, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    createdAt: timestamp("created_at").default(sql`now()`),
    title: varchar("title", { length: 64 }).notNull(),
    description: varchar("description", { length: 128 }).notNull(),
  },
  (table) => ({
    cardNameIndex: index("card_name_index").on(table.cardName),
  }),
);
