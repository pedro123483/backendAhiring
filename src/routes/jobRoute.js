import { Router } from "express";
import jobController from "../controllers/jobController.js";

const router = Router();

router.post("/", jobController.create);

export default router;