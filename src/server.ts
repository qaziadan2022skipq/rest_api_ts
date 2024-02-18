import http from "http";
import connectDB from "./database/mongo";
import app from "./app"

const init = async () => {
    const port = process.env.port! || 3000
    const server = http.createServer(app);
    await connectDB()
    server.listen(port, () => {
        console.info(`Server running on port ${port}`);
    });
}

init();

