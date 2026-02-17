import { MongoClient, Db } from "mongodb";

const uri = "TU_URI_MONGO";

const client = new MongoClient(uri);
let db: Db;

export const connectMongo = async () => {
    await client.connect();
    db = client.db("blogLogs");
    console.log("MongoDB connected");
};

export const getDb = () => db;
