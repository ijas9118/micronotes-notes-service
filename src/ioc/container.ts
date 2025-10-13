import { Container } from "inversify";

import type { ITagController } from "@/controllers/interfaces/tags.controller.interface";
import type { ITagRepository } from "@/repositories/interfaces/tags.repo.interface.js";
import type { ITagService } from "@/services/interfaces/tags.service.interface";

import { TagController } from "@/controllers/implementation/tags.controller";
import { TagRepository } from "@/repositories/implementation/tags.repository.js";
import { TagService } from "@/services/implementation/tags.service";

import TYPES from "./types";

const container = new Container();

container.bind<ITagRepository>(TYPES.TagRepository).to(TagRepository);
container.bind<ITagService>(TYPES.TagService).to(TagService);
container.bind<ITagController>(TYPES.TagController).to(TagController);

export { container };
