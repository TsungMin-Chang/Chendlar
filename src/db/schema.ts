import {
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
  pgTable,
  index
} from "drizzle-orm/pg-core";

// watch this playlist to learn more about database schemas:
// https://planetscale.com/learn/courses/mysql-for-developers/schema/introduction-to-schema

// learn more about indexes here:
// https://planetscale.com/learn/courses/mysql-for-developers/indexes/introduction-to-indexes

// composite indexes: indexes on multiple columns
// https://planetscale.com/learn/courses/mysql-for-developers/indexes/composite-indexes
    
export const usersTable = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom(),
    username: varchar("username", { length: 50 }).notNull(),
    password: varchar("password", { length: 100 }).notNull(),
  },
  (table) => ({
    idIndex: index("id_index").on(table.id),
  }),
);

export const affairsTable = pgTable(
  "affairs",
  {
    id: uuid("id").defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    title: varchar("title", { length: 50 }).notNull(),
    color: varchar("color", { length: 10 }).notNull(),
    type: varchar("type", { length: 10 }).notNull(),
    time1: timestamp("time1").notNull(),
    time2: timestamp("time2").notNull(),
    timeString: varchar("time_string", { length: 20 }).notNull(),
    isDone: boolean("is_done").notNull(),
    order: integer("order").notNull(),
  },
  (table) => ({
    timeStringIndex: index("time_string_index").on(table.timeString),
    // replyToAndTimeIndex: index("reply_to_time_index").on(
    //   table.replyToTweetId,
    //   table.createdAt,
    // ),
  }),
);