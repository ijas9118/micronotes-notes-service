import { and, eq } from "drizzle-orm";
import { injectable } from "inversify";

import type { NewTags, Tags } from "@/db/schema.js";

import { db } from "@/db/index.js";
import { tags } from "@/db/schema.js";

import type { ITagRepository } from "../interfaces/tags.repo.interface.js";

@injectable()
export class TagRepository implements ITagRepository {
  async create(tag: NewTags): Promise<Tags> {
    const [createdTag] = await db.insert(tags).values(tag).returning();
    return createdTag;
  }

  async findById(id: string, userId: string): Promise<Tags | null> {
    const [tag] = await db.select()
      .from(tags)
      .where(and(eq(tags.id, id), eq(tags.userId, userId)));

    return tag || null;
  }

  async findByName(userId: string, tagName: string): Promise<Tags | null> {
    const [tag] = await db.select()
      .from(tags)
      .where(and(eq(tags.tagName, tagName), eq(tags.userId, userId)));

    return tag || null;
  }

  async findAll(userId: string): Promise<Tags[]> {
    return await db.select().from(tags).where(eq(tags.userId, userId));
  }

  async update(id: string, userId: string, updates: Partial<Tags>): Promise<Tags> {
    const [updated] = await db.update(tags)
      .set({ ...updates, updatedAt: new Date() })
      .where(and(eq(tags.userId, userId), eq(tags.id, id)))
      .returning();

    return updated;
  }

  async delete(id: string, userId: string): Promise<void> {
    await db.delete(tags)
      .where(and(eq(tags.id, id), eq(tags.userId, userId)));
  }
}
