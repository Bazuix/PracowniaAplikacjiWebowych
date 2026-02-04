import express from "express";
import prisma from "./prisma";

import wpisRoutes from "./routes/wpis";
import kategoriaRoutes from "./routes/kategoria";
import komentarzRoutes from "./routes/komentarz";

const app = express();
app.use(express.json());

app.use("/api/wpisy", wpisRoutes);
app.use("/api/kategorie", kategoriaRoutes);
app.use("/api/komentarze", komentarzRoutes);

app.get("/", (_req, res) => {
    res.json({ message: "Blog działa" });
});

app.listen(3000, () => {
    console.log("Server działa na http://localhost:3000");
});


