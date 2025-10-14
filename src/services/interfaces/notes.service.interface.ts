import type { NotesDTO, PaginatedNotesDTO } from "@/types/dto/index.js";

export type INotesService = {
  createNote: (userId: string, noteData: { title: string; content: string }) => Promise<NotesDTO>;
  getNoteById: (id: string, userId: string) => Promise<NotesDTO>;
  getNotes: (userId: string, params: { limit?: number; offset?: number; search?: string }) => Promise<PaginatedNotesDTO>;
  updateNote: (id: string, userId: string, noteData: { title: string; content: string }) => Promise<NotesDTO>;
};
