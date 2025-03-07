import "./config/env.config.js"
import express from "express";
import cors from "cors";
import { envConfig } from "./config/env.config.js";
import { logger } from "./utils/logger/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(envConfig.PORT, () => {
    logger?.info(`Server is running on port ${envConfig.PORT}`);
});