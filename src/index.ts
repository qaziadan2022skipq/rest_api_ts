import express from 'express';
import http from "http";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors";
import compression from "compression";
import mongoose from 'mongoose';

const app = express();

app.use(cors({
    credentials: true
}));

app.use(compression())
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("Server running on port 3000");
})

const MONGODB_URL = "mongodb://localhost:27017/rest_api_node_ts"

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL);
mongoose.connection.on("error", (error: Error) => console.log(error))
