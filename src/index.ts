import express from "express";
import cors from "cors";
import { envConfig, loadEnv } from "./config/env.config.js";
import { connectDb } from "./config/db.connect.js";
import { appLogger } from "./utils/logger/index.js";
import { userAuthRouter } from "./modules/user/routers/user-auth.routes.js";
import { authenticateUser } from "./middlewares/auth.middleware.js";
import { globalErrorHandler } from "extils";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";

loadEnv();
await connectDb()

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5252", envConfig.FRONTEND_URL],
    credentials: true,
    maxAge: 600
}));

declare module "express" {
    export interface Request {
        user?: string
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public/")))

app.use("/v1/users/auth", userAuthRouter);
app.use(authenticateUser);


app.listen(envConfig.PORT, () => {
    appLogger?.info(`Server: http://localhost:${envConfig.PORT}`);
});

app.use(globalErrorHandler)