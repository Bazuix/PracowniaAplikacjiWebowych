import express from "express";
import dotenv from "dotenv";
import { connectMongo } from "./mongo";

import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";

import wpisRoutes from "./routes/wpis";
import kategoriaRoutes from "./routes/kategoria";
import komentarzRoutes from "./routes/komentarz";

dotenv.config();

const app = express();
app.use(express.json());

app.use(logger);

app.use("/api/wpisy", wpisRoutes);
app.use("/api/kategorie", kategoriaRoutes);
app.use("/api/komentarze", komentarzRoutes);

app.use(errorHandler);

const start = async () => {
    await connectMongo();

    app.listen(3000, () => {
        console.log("Server działa: http://localhost:3000");
    });
};

start();

