import express from "express";
import prisma from "./prisma";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ message: "Blog działa" });
});

app.listen(3000, () => {
    console.log("Server działa na http://localhost:3000");
});

