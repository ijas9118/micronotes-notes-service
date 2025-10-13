import type { NewNotes, Notes } from "@/db/schema.js";

export type INotesRepository = {
  create: (note: NewNotes) => Promise<Notes>;
  findById: (id: string, userId: string) => Promise<Notes | null>;
  findByTitle: (title: string, userId: string) => Promise<Notes | null>;
  findAll: (userId: string) => Promise<Notes[]>;
  update: (id: string, userId: string, updates: Partial<Notes>) => Promise<Notes>;
};
