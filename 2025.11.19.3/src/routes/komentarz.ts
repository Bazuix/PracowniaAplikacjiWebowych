import { Router } from "express";
import prisma from "../prisma";

const router = Router();


router.post("/", async (req, res) => {
    const { autor, tresc, wpisId } = req.body;
    try {
        const komentarz = await prisma.komentarz.create({
            data: { autor, tresc, wpisId },
        });
        res.status(201).json(komentarz);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});


router.get("/", async (_req, res) => {
    const komentarze = await prisma.komentarz.findMany({ include: { wpis: true } });
    res.json(komentarze);
});


router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const komentarz = await prisma.komentarz.findUnique({
        where: { id },
        include: { wpis: true },
    });
    if (!komentarz) return res.status(404).json({ error: "Komentarz nie istnieje" });
    res.json(komentarz);
});


router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const komentarz = await prisma.komentarz.update({
            where: { id },
            data: req.body,
        });
        res.json(komentarz);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma.komentarz.delete({ where: { id } });
        res.status(204).end();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
