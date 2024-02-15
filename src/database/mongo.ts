import mongoose from "mongoose";

const databaseURI = "mongodb://localhost:27017/"
const databaseName = "rest_apis_node_ts"

const connectDB = async () => {
    try {
        mongoose.connect(databaseURI, {
            dbName: databaseName
        });
        const connection = mongoose.connection;
        connection.on("open", () => {
            console.log(`Connected to ${databaseName}`)
        })
        connection.on("error", (error: Error) => console.log(error));
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default connectDB;