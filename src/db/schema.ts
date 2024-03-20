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
  username: varchar("username", { length: 32 }).notNull(),
  password: varchar("password", { length: 32 }).notNull(),
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
    title: varchar("title", { length: 20 }).notNull(),
    color: varchar("color", { length: 8 }).notNull(),
    type: varchar("type", { length: 8 }).notNull(),
    time1: timestamp("time1").notNull(),
    time2: timestamp("time2").notNull(),
    isDone: boolean("is_done").notNull(),
    order: integer("order").notNull(),
    monthNumber: integer("month_number").notNull(),
    weekNumber: integer("week_number").notNull(),
    dayNumber: integer("day_number").notNull(),
  },
  (table) => ({
    dayNumberIndex: index("day_number_index").on(table.dayNumber),
    weekNumberIndex: index("week_number_index").on(table.weekNumber),
    monthNumberIndex: index("month_number_index").on(table.monthNumber),
  }),
);
