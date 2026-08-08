import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";

const router = Router();

// Public: list products
router.get("/", async (req, res) => {
  try {
    const { category, search, featured, page = "1", limit = "12" } = req.query;

    const where: any = { isActive: true };

    if (category) {
      where.category = { slug: String(category) };
    }
    if (featured === "true") {
      where.isFeatured = true;
    }
    if (search) {
      where.OR = [
        { title: { contains: String(search), mode: "insensitive" } },
        { description: { contains: String(search), mode: "insensitive" } },
      ];
    }

    const pageNum = Math.max(1, parseInt(String(page)));
    const limitNum = Math.min(50, parseInt(String(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limitNum,
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Public: get single product by slug
router.get("/:slug", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: true,
      },
    });

    if (!product || !product.isActive) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Admin: create product
const productSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  stock: z.number().int().nullable().optional(),
  deliveryType: z.enum(["DOWNLOAD_FILE", "LICENSE_KEY", "COURSE_ACCESS", "EMAIL_DELIVERY"]),
  categoryId: z.string(),
  coverImageUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

router.post(
  "/",
  authenticate,
  requireRole("ADMIN"),
  async (req: AuthRequest, res) => {
    try {
      const data = productSchema.parse(req.body);

      const existing = await prisma.product.findUnique({
        where: { slug: data.slug },
      });
      if (existing) {
        return res.status(400).json({ error: "Slug already exists" });
      }

      const product = await prisma.product.create({
        data: {
          title: data.title,
          slug: data.slug,
          description: data.description,
          price: data.price,
          compareAtPrice: data.compareAtPrice,
          stock: data.stock ?? null,
          deliveryType: data.deliveryType,
          categoryId: data.categoryId,
          coverImageUrl: data.coverImageUrl,
          isActive: data.isActive ?? true,
          isFeatured: data.isFeatured ?? false,
        },
        include: { category: true },
      });

      res.status(201).json({ product });
    } catch (err: any) {
      if (err.name === "ZodError") {
        return res.status(400).json({ error: err.errors[0].message });
      }
      console.error(err);
      res.status(500).json({ error: "Failed to create product" });
    }
  }
);

// Admin: update product
router.put(
  "/:id",
  authenticate,
  requireRole("ADMIN"),
  async (req: AuthRequest, res) => {
    try {
      const data = productSchema.partial().parse(req.body);

      const product = await prisma.product.update({
        where: { id: req.params.id },
        data,
        include: { category: true },
      });

      res.json({ product });
    } catch (err: any) {
      if (err.code === "P2025") {
        return res.status(404).json({ error: "Product not found" });
      }
      console.error(err);
      res.status(500).json({ error: "Failed to update product" });
    }
  }
);

// Admin: delete product (soft)
router.delete(
  "/:id",
  authenticate,
  requireRole("ADMIN"),
  async (req: AuthRequest, res) => {
    try {
      await prisma.product.update({
        where: { id: req.params.id },
        data: { isActive: false },
      });
      res.json({ message: "Product deactivated" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  }
);

export default router;
