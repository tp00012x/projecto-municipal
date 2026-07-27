import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const comments = sqliteTable(
  "proposal_comments",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    proposalNumber: integer("proposal_number").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull().default(""),
    comment: text("comment").notNull(),
    acceptedTerms: integer("accepted_terms", { mode: "boolean" }).notNull(),
    status: text("status").notNull().default("pending"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("proposal_comments_proposal_idx").on(table.proposalNumber),
    index("proposal_comments_status_idx").on(table.status),
  ],
);
