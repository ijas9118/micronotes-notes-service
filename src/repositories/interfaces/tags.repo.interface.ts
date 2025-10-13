import type { NewTags, Tags } from "@/db/schema";

export type ITagRepository = {
  create: (tag: NewTags) => Promise<Tags>;
  findById: (id: string, userId: string) => Promise<Tags | null>;
  findByName: (userId: string, tagName: string) => Promise<Tags | null>;
  findAll: (userId: string) => Promise<Tags[]>;
  update: (id: string, userId: string, updates: Partial<Tags>) => Promise<Tags>;
  delete: (id: string, userId: string) => Promise<void>;
};
