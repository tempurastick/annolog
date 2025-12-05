import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import { loadEnvFile } from "node:process";
loadEnvFile();

const uri = process.env.MONGO_URI;

export default async function connectDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        const conn = await mongoose.connect(uri);

        // Send a ping to confirm a successful connection

        console.log(
            `You successfully connected to MongoDB!: ${conn.connection.host} `
        );
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
    // finally {
    //     // Ensures that the client will close when you finish/error
    //     await mongoose.connection.close();
    // }
}
