import type { Notes } from "@/db/schema.js";
import type { NotesDTO } from "@/types/dto/index.js";

export class NotesMapper {
  static toDTO(note: Notes): NotesDTO {
    return {
      id: note.id,
      userId: note.userId,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
    };
  }
}
