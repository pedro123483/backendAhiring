// imports required
import { Router } from "express";
import userController from "../controllers/userController.js";

// creating route for allowing to create a user in the database and login functionality
const router = Router();

router.post("/", userController.create);
router.post("/login", userController.login);

// exporting route
export default router;