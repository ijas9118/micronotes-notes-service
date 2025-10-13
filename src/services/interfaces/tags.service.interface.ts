import type { TagDTO } from "@/types/dto/index.js";

export type ITagService = {
  createTag: (userId: string, tagData: { tagName: string; color: string }) => Promise<TagDTO>;
  getTagById: (id: string, userId: string) => Promise<TagDTO>;
  getTags: (userId: string) => Promise<TagDTO[]>;
  updateTag: (id: string, userId: string, tagData: { tagName?: string; color?: string }) => Promise<TagDTO>;
  deleteTag: (id: string, userId: string) => Promise<void>;
};
