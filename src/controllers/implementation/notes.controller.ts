import type { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";

import type { INotesService } from "@/services/interfaces/notes.service.interface.js";

import TYPES from "@/ioc/types.js";

import type { INotesController } from "../interfaces/notes.controller.interface.js";

@injectable()
export class NotesController implements INotesController {
  constructor(@inject(TYPES.NotesService) private _notesService: INotesService) {}

  create = async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;

    const note = await this._notesService.createNote(userId, { ...req.body });
    res.status(StatusCodes.CREATED).json({ message: "Note created", data: note });
  };

  getById = async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const { id } = req.params;

    const note = await this._notesService.getNoteById(id, userId);
    res.status(StatusCodes.OK).json({ message: "Note Fetched", data: note });
  };

  getAll = async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;

    const notes = await this._notesService.getNotes(userId);
    res.status(StatusCodes.OK).json({ message: "Notes Fetched", data: notes });
  };

  update = async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const { id } = req.params;

    const note = await this._notesService.updateNote(id, userId, { ...req.body });
    res.status(StatusCodes.OK).json({ message: "Note Updated", data: note });
  };
}
