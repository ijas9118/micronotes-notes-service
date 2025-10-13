import type { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";

import type { ITagService } from "@/services/interfaces/tags.service.interface.js";

import TYPES from "@/ioc/types.js";

import type { ITagController } from "../interfaces/tags.controller.interface.js";

@injectable()
export class TagController implements ITagController {
  constructor(@inject(TYPES.TagService) private _tagService: ITagService) {}

  create = async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const { tagName, color } = req.body;

    const tag = await this._tagService.createTag(userId, { tagName, color });
    res.status(StatusCodes.CREATED).json({ message: "Tag created", data: tag });
  };

  getById = async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const { id } = req.params;

    const tag = await this._tagService.getTagById(id, userId);
    res.status(StatusCodes.OK).json({ message: "Tag Fetched", data: tag });
  };

  getAll = async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;

    const tags = await this._tagService.getTags(userId);
    res.status(StatusCodes.OK).json({ message: "Tags Fetched", data: tags });
  };

  update = async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const { id } = req.params;
    const { tagName, color } = req.body;

    const tag = await this._tagService.updateTag(id, userId, { tagName, color });
    res.status(StatusCodes.OK).json({ message: "Tag Updated", data: tag });
  };

  delete = async (req: Request, res: Response) => {
    const userId = req.user?.userId as string;
    const { id } = req.params;

    await this._tagService.deleteTag(id, userId);
    res.status(StatusCodes.OK).json({ message: "Tag deleted" });
  };
}
