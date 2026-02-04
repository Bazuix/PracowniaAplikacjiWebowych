import { Router } from "express";
import prisma from "../prisma";

const router = Router();


router.post("/", async (req, res) => {
    const { tytul, tresc, kategoriaId } = req.body;
    try {
        const wpis = await prisma.wpis.create({
            data: { tytul, tresc, kategoriaId },
        });
        res.status(201).json(wpis);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});


router.get("/", async (_req, res) => {
    const wpisy = await prisma.wpis.findMany({
        include: { kategoria: true, komentarze: true },
    });
    res.json(wpisy);
});


router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const wpis = await prisma.wpis.findUnique({
        where: { id },
        include: { kategoria: true, komentarze: true },
    });
    if (!wpis) return res.status(404).json({ error: "Wpis nie istnieje" });
    res.json(wpis);
});


router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const wpis = await prisma.wpis.update({
            where: { id },
            data: req.body,
        });
        res.json(wpis);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma.wpis.delete({ where: { id } });
        res.status(204).end();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
