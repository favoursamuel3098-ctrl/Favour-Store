import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";
import { z } from "zod";

const router = Router();

// Public: list categories
router.get("/", async (_req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Admin: create category
router.post(
  "/",
  authenticate,
  requireRole("ADMIN"),
  async (req: AuthRequest, res) => {
    try {
      const schema = z.object({
        name: z.string().min(2),
        slug: z.string().min(2),
        description: z.string().optional(),
        imageUrl: z.string().url().optional(),
      });
      const data = schema.parse(req.body);

      const category = await prisma.category.create({ data });
      res.status(201).json({ category });
    } catch (err: any) {
      if (err.code === "P2002") {
        return res.status(400).json({ error: "Slug already exists" });
      }
      res.status(500).json({ error: "Failed to create category" });
    }
  }
);

export default router;
