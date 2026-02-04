import { Router } from "express";
import prisma from "../prisma";

const router = Router();


router.post("/", async (req, res) => {
    const { nazwa } = req.body;
    try {
        const kategoria = await prisma.kategoria.create({ data: { nazwa } });
        res.status(201).json(kategoria);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});


router.get("/", async (_req, res) => {
    const kategorie = await prisma.kategoria.findMany({ include: { wpisy: true } });
    res.json(kategorie);
});


router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const kategoria = await prisma.kategoria.findUnique({
        where: { id },
        include: { wpisy: true },
    });
    if (!kategoria) return res.status(404).json({ error: "Kategoria nie istnieje" });
    res.json(kategoria);
});


router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const kategoria = await prisma.kategoria.update({
            where: { id },
            data: req.body,
        });
        res.json(kategoria);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma.kategoria.delete({ where: { id } });
        res.status(204).end();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
