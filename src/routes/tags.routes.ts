import { Router } from "express";

import type { ITagController } from "@/controllers/interfaces/tags.controller.interface.js";

import { container } from "@/ioc/container.js";
import TYPES from "@/ioc/types.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";

const router = Router();

const tagController = container.get<ITagController>(TYPES.TagController);

router.post("/", authMiddleware, tagController.create);
router.get("/:id", authMiddleware, tagController.getById);
router.get("/", authMiddleware, tagController.getAll);
router.put("/:id", authMiddleware, tagController.update);
router.delete("/:id", authMiddleware, tagController.delete);

export default router;
