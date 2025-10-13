import type { NotesDTO } from "@/types/dto/index.js";

export type INotesService = {
  createNote: (userId: string, noteData: { title: string; content: string }) => Promise<NotesDTO>;
  getNoteById: (id: string, userId: string) => Promise<NotesDTO>;
  getNotes: (userId: string) => Promise<NotesDTO[]>;
  updateNote: (id: string, userId: string, noteData: { title: string; content: string }) => Promise<NotesDTO>;
};
