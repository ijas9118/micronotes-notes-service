import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";

import type { INotesRepository } from "@/repositories/interfaces/notes.repo.interface.js";
import type { NotesDTO, PaginatedNotesDTO } from "@/types/dto/index.js";

import TYPES from "@/ioc/types.js";
import { NotesMapper } from "@/mappers/notes.mapper.js";
import { HttpError } from "@/utils/http-error-class.js";

import type { INotesService } from "../interfaces/notes.service.interface.js";

@injectable()
export class NotesService implements INotesService {
  constructor(@inject(TYPES.NotesRepository) private _notesRepo: INotesRepository) {}

  async createNote(userId: string, noteData: { title: string; content: string }): Promise<NotesDTO> {
    const existing = await this._notesRepo.findByTitle(noteData.title, userId);
    if (existing)
      throw new HttpError("Note already exists", StatusCodes.CONFLICT);

    const note = await this._notesRepo.create({ userId, ...noteData });

    return NotesMapper.toDTO(note);
  }

  async getNotes(userId: string, params: { limit?: number; offset?: number; search?: string }): Promise<PaginatedNotesDTO> {
    const { data, total } = await this._notesRepo.findAll(userId, params);

    const notes = data.map(note => NotesMapper.toDTO(note));

    return {
      notes,
      total,
      limit: params.limit ?? 5,
      offset: params.offset ?? 0,
      search: params.search ?? "",
    };
  }

  async getNoteById(id: string, userId: string): Promise<NotesDTO> {
    const note = await this._notesRepo.findById(id, userId);
    if (!note)
      throw new HttpError("Note not found", StatusCodes.NOT_FOUND);
    return NotesMapper.toDTO(note);
  }

  async updateNote(id: string, userId: string, noteData: { title: string; content: string }): Promise<NotesDTO> {
    const note = this._notesRepo.findById(id, userId);
    if (!note)
      throw new HttpError("Note not found", StatusCodes.NOT_FOUND);

    const newNote = await this._notesRepo.update(id, userId, { ...noteData });
    return NotesMapper.toDTO(newNote);
  }
}
