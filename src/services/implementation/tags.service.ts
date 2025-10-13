import { StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";

import type { ITagRepository } from "@/repositories/interfaces/tags.repo.interface";
import type { TagDTO } from "@/types/dto";

import TYPES from "@/ioc/types";
import { TagMapper } from "@/mappers/tags.mapper";
import { HttpError } from "@/utils/http-error-class";

import type { ITagService } from "../interfaces/tags.service.interface";

@injectable()
export class TagService implements ITagService {
  constructor(@inject(TYPES.TagRepository) private _tagRepo: ITagRepository) {}

  async createTag(userId: string, tagData: { tagName: string; color: string }): Promise<TagDTO> {
    const existing = await this._tagRepo.findByName(userId, tagData.tagName);
    if (existing)
      throw new HttpError("Tag already exists", StatusCodes.CONFLICT);

    const tag = await this._tagRepo.create({ userId, tagName: tagData.tagName, color: tagData.color });

    return TagMapper.toDTO(tag);
  }

  async getTagById(id: string, userId: string): Promise<TagDTO> {
    const tag = await this._tagRepo.findById(id, userId);
    if (!tag)
      throw new HttpError("Tag not found", StatusCodes.NOT_FOUND);
    return TagMapper.toDTO(tag);
  }

  async getTags(userId: string): Promise<TagDTO[]> {
    const tags = await this._tagRepo.findAll(userId);

    return tags.map(tag => TagMapper.toDTO(tag));
  }

  async updateTag(id: string, userId: string, tagData: { tagName?: string; color?: string }): Promise<TagDTO> {
    const tag = this._tagRepo.findById(id, userId);
    if (!tag)
      throw new HttpError("Tag not found", StatusCodes.NOT_FOUND);

    const newTag = await this._tagRepo.update(id, userId, { tagName: tagData.tagName, color: tagData.color });
    return TagMapper.toDTO(newTag);
  }

  async deleteTag(id: string, userId: string): Promise<void> {
    await this._tagRepo.delete(id, userId);
  }
}
