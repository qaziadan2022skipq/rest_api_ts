import express, { Express } from 'express';
import http from "http";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors";
import compression from "compression";
import routes from "./routes/index"
import dotenv from "dotenv"

const app: Express = express();

app.use(cors({
    credentials: true
}));

dotenv.config()

app.use(compression())
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1/", routes)

export default app;