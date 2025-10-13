import type { NextFunction, Request, Response } from "express";

export type INotesController = {
  create: (req: Request, res: Response, next: NextFunction) => void;
  getById: (req: Request, res: Response, next: NextFunction) => void;
  getAll: (req: Request, res: Response, next: NextFunction) => void;
  update: (req: Request, res: Response, next: NextFunction) => void;
};
