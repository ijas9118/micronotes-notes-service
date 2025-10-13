import { and, eq } from "drizzle-orm";
import { injectable } from "inversify";

import type { NewNotes, Notes } from "@/db/schema.js";

import { db } from "@/db/index.js";
import { notes } from "@/db/schema.js";

import type { INotesRepository } from "../interfaces/notes.repo.interface.js";

@injectable()
export class NotesRepository implements INotesRepository {
  async create(note: NewNotes): Promise<Notes> {
    const [createdNote] = await db.insert(notes).values(note).returning();
    return createdNote;
  }

  async findById(id: string, userId: string): Promise<Notes | null> {
    const [note] = await db.select()
      .from(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, userId)));

    return note || null;
  }

  async findByTitle(title: string, userId: string): Promise<Notes | null> {
    const [note] = await db.select()
      .from(notes)
      .where(and(eq(notes.title, title), eq(notes.userId, userId)));

    return note || null;
  }

  async findAll(userId: string): Promise<Notes[]> {
    return await db.select().from(notes).where(eq(notes.userId, userId));
  }

  async update(id: string, userId: string, updates: Partial<NewNotes>): Promise<Notes> {
    const [updated] = await db.update(notes)
      .set({ ...updates, updatedAt: new Date() })
      .where(and(eq(notes.userId, userId), eq(notes.id, id)))
      .returning();

    return updated;
  }
}
