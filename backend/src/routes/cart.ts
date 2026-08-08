import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// Get current user's cart
router.get("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const items = await prisma.cartItem.findMany({
      where: { userId: req.user!.id },
      include: {
        product: {
          select: {
            id: true,
            title: true,
            slug: true,
            price: true,
            coverImageUrl: true,
            deliveryType: true,
            stock: true,
            isActive: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const subtotal = items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0);

    res.json({
      items,
      summary: {
        itemCount: items.length,
        subtotal,
        currency: "NGN",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Add item to cart
router.post("/add", authenticate, async (req: AuthRequest, res) => {
  try {
    const schema = z.object({
      productId: z.string(),
      quantity: z.number().int().min(1).max(10).default(1),
    });
    const { productId, quantity } = schema.parse(req.body);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.isActive) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Digital products usually qty 1
    const existing = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user!.id,
          productId,
        },
      },
    });

    if (existing) {
      return res.json({ message: "Already in cart", item: existing });
    }

    const item = await prisma.cartItem.create({
      data: {
        userId: req.user!.id,
        productId,
        quantity: 1,
      },
      include: { product: true },
    });

    res.status(201).json({ message: "Added to cart", item });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// Remove item from cart
router.delete("/:productId", authenticate, async (req: AuthRequest, res) => {
  try {
    await prisma.cartItem.deleteMany({
      where: {
        userId: req.user!.id,
        productId: req.params.productId,
      },
    });
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});

// Clear cart
router.delete("/", authenticate, async (req: AuthRequest, res) => {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: req.user!.id },
    });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

export default router;
