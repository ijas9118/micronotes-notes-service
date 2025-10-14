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
    const { page = "1", limit = "10", search = "" } = req.query;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));

    const data = await this._notesService.getNotes(userId, {
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
      search: typeof search === "string" ? search : "",
    });
    res.status(StatusCodes.OK).json({ message: "Notes Fetched", data });
  };

  update = async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const { id } = req.params;

    const note = await this._notesService.updateNote(id, userId, { ...req.body });
    res.status(StatusCodes.OK).json({ message: "Note Updated", data: note });
  };
}
