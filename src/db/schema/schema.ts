import {
  boolean,
  integer,
  json,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core/table";
import { relations } from "drizzle-orm/relations";
import { InferSelectModel } from "drizzle-orm/table";

export const users = pgTable("person", {
  passwordHash: varchar("password_hash", { length: 120 }).notNull(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  phoneNumber: varchar("phone", { length: 20 }).unique().notNull(),
  email: varchar({ length: 60 }).notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  currency: varchar({ length: 1 }).default("$").notNull(),
  account_bal: integer().default(0).notNull(),
  verified: boolean().default(false).notNull(),
  verifying: boolean().default(false).notNull(),
  pending_KYC: boolean().default(false).notNull(),
  isAdmin: boolean().default(false).notNull(),
  account_no: serial().primaryKey().notNull().unique(),
  trans: json().$type<
    {
      // accountName: string;
      type: string;
      amount: number;
      date: string | Date;
      category: string;
      description: string;
    }[]
  >(),
  pin: varchar({ length: 5 }).default("44774").notNull(),
});

// export const transactions = pgTable("transaction", {
//   // id: string().length(10),
//   accountName: text(),
//   id: text("id")
//     .primaryKey()
//     .notNull()
//     .default(sql`gen_random_uuid()`),
//   type: text({ enum: ["Deposit", "Withdrawal"] }).notNull(),
//   user_id: integer()
//     .references(() => users.account_no, { onDelete: "cascade" })
//     .notNull(),
//   amount: numeric({ precision: 20, scale: 2 }).default("0").notNull(),
//   date: timestamp("date").notNull(),
//   note: text(),
// });

export const usersRelations = relations(users, ({ many, one }) => ({
  // receipient: many(transactions, { relationName: "receipient" }),
  verifications: one(verifications),
}));

// export const transactionsRelations = relations(transactions, ({ one }) => ({
//   user: one(users, {
//     fields: [transactions.receipient_id],
//     references: [users.account_no],
//     relationName: "user",
//   }),
// }));

export const verifications = pgTable("verification", {
  id: serial().primaryKey(),
  user_id: integer()
    .references(() => users.account_no)
    .notNull(),
  identity_doc: text().notNull(),
  address_doc: text().notNull(),
});

export const verificationRelations = relations(verifications, ({ one }) => ({
  user: one(users, {
    fields: [verifications.user_id],
    references: [users.account_no],
  }),
}));

// export type Transaction = InferSelectModel<typeof transactions> & {
//   user: User;
// };
export type Verification = InferSelectModel<typeof verifications>;
export type User = InferSelectModel<typeof users> & {
  verification: Verification;
};
