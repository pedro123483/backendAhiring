// imports requireds
import { Router } from "express";
import curriculumController from "../controllers/curriculumController.js";

// creating route for curriculum pdf
const router = Router();

router.post("/", curriculumController.create);

// exporting route
export default router;