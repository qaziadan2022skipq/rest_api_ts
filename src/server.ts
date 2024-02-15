import http from "http";
import connectDB from "./database/mongo";
import app from "./app"

const init = async () => {
    const server = http.createServer(app);
    await connectDB()
    server.listen(process.env.PORT! || 3000, () => {
        console.info("Server running on port 3000");
    });
}

init();

