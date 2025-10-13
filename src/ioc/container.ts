import { Container } from "inversify";

import type { INotesController } from "@/controllers/interfaces/notes.controller.interface.js";
import type { ITagController } from "@/controllers/interfaces/tags.controller.interface.js";
import type { INotesRepository } from "@/repositories/interfaces/notes.repo.interface.js";
import type { ITagRepository } from "@/repositories/interfaces/tags.repo.interface.js";
import type { INotesService } from "@/services/interfaces/notes.service.interface.js";
import type { ITagService } from "@/services/interfaces/tags.service.interface.js";

import { NotesController } from "@/controllers/implementation/notes.controller.js";
import { TagController } from "@/controllers/implementation/tags.controller.js";
import { NotesRepository } from "@/repositories/implementation/notes.repository.js";
import { TagRepository } from "@/repositories/implementation/tags.repository.js";
import { NotesService } from "@/services/implementation/notes.service.js";
import { TagService } from "@/services/implementation/tags.service.js";

import TYPES from "./types.js";

const container = new Container();

container.bind<ITagRepository>(TYPES.TagRepository).to(TagRepository);
container.bind<ITagService>(TYPES.TagService).to(TagService);
container.bind<ITagController>(TYPES.TagController).to(TagController);

container.bind<INotesRepository>(TYPES.NotesRepository).to(NotesRepository);
container.bind<INotesService>(TYPES.NotesService).to(NotesService);
container.bind<INotesController>(TYPES.NotesController).to(NotesController);

export { container };
