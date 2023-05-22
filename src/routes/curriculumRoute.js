import { Router } from "express";
import curriculumController from "../controllers/curriculumController.js";

const router = Router();

router.post("/", curriculumController.create);

export default router;