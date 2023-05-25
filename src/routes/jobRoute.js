// imports required
import { Router } from "express";
import jobController from "../controllers/jobController.js";

// creating route for generate job description
const router = Router();

router.post("/", jobController.create);

// exporting route
export default router;