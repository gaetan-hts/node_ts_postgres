import { pgTable, uuid, varchar, date, json } from "drizzle-orm/pg-core";

export const tournaments = pgTable('tournaments', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // Example: 'bullet', 'blitz', 'rapid'
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  status: varchar('status', { length: 50 }).notNull().default('scheduled'), // Example: 'scheduled', 'in progress', 'completed'
  ranking: json('ranking'), // Stores a JSON array of rankings
});
