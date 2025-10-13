import { Router } from "express";

import type { INotesController } from "@/controllers/interfaces/notes.controller.interface.js";

import { container } from "@/ioc/container.js";
import TYPES from "@/ioc/types.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";

const router = Router();

const notesController = container.get<INotesController>(TYPES.NotesController);

router.post("/", authMiddleware, notesController.create);
router.get("/:id", authMiddleware, notesController.getById);
router.get("/", authMiddleware, notesController.getAll);
router.put("/:id", authMiddleware, notesController.update);

export default router;
