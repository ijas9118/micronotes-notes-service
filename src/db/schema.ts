import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import { boolean, index, pgTable, primaryKey, text, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),
  userId: uuid("user_id")
    .notNull(),
  title: varchar("title", { length: 255 })
    .notNull(),
  content: text("content")
    .notNull(),
  pinned: boolean("pinned")
    .default(false)
    .notNull(),
  isArchived: boolean("is_archived")
    .default(false)
    .notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
}, table => [
  index("notes_user_id_idx").on(table.userId),
  index("notes_is_archived_idx").on(table.isArchived),
]);

export const tags = pgTable("tags", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),
  userId: uuid("user_id")
    .notNull(),
  tagName: varchar("tag_name", { length: 100 })
    .notNull(),
  color: varchar("color", { length: 7 }),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
}, table => [
  uniqueIndex("tags_user_tag_unique").on(table.userId, table.tagName),
  index("tags_user_id_idx").on(table.userId),
]);

export const noteTags = pgTable("note_tags", {
  noteId: uuid("note_id").notNull(),
  tagId: uuid("tag_id").notNull(),
}, table => [
  primaryKey({ columns: [table.noteId, table.tagId] }),
]);

export type Tags = InferSelectModel<typeof tags>;
export type NewTags = InferInsertModel<typeof tags>;

export type Notes = InferSelectModel<typeof notes>;
export type NewNotes = InferInsertModel<typeof notes>;
