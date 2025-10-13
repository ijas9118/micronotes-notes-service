import type { Tags } from "@/db/schema.js";
import type { TagDTO } from "@/types/dto/index.js";

export class TagMapper {
  static toDTO(tag: Tags): TagDTO {
    return {
      id: tag.id,
      userId: tag.userId,
      tagName: tag.tagName || "",
      color: tag.color || "",
      createdAt: tag.createdAt,
    };
  }
}
