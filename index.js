import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import curriculumRoute from "./src/routes/curriculumRoute.js";
import jobRoute from "./src/routes/jobRoute.js";
import { connectToDatabase } from "./src/database/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

connectToDatabase();

app.use(fileUpload());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/curriculum", curriculumRoute);
app.use("/job", jobRoute);

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");

    next();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});