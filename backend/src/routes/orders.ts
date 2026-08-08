import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate, AuthRequest } from "../middleware/auth";
import { randomBytes } from "crypto";

const router = Router();

function generateReference() {
  return "FS-" + randomBytes(6).toString("hex").toUpperCase();
}

// Create order from cart (checkout)
router.post("/checkout", authenticate, async (req: AuthRequest, res) => {
  try {
    const schema = z.object({
      phone: z.string().min(10).optional(),
    });
    const body = schema.parse(req.body);

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user!.id },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Validate products still active
    for (const item of cartItems) {
      if (!item.product.isActive) {
        return res.status(400).json({
          error: `Product "${item.product.title}" is no longer available`,
        });
      }
    }

    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0
    );
    const tax = 0;
    const total = subtotal + tax;
    const reference = generateReference();

    // Create order + items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          reference,
          userId: req.user!.id,
          status: "PENDING",
          subtotal,
          tax,
          total,
          currency: "NGN",
          paymentProvider: "opay",
        },
      });

      for (const item of cartItems) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
            deliveryType: item.product.deliveryType,
          },
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId: req.user!.id },
      });

      return newOrder;
    });

    // TODO: Initialize Opay payment here and return payment URL
    // For now we return the order so frontend can proceed

    res.status(201).json({
      message: "Order created",
      order: {
        id: order.id,
        reference: order.reference,
        total: order.total,
        currency: order.currency,
        status: order.status,
      },
      // When Opay is connected, this will contain the payment URL
      payment: {
        provider: "opay",
        message: "Opay integration coming next — order is ready",
      },
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors[0].message });
    }
    console.error(err);
    res.status(500).json({ error: "Checkout failed" });
  }
});

// Get user's orders
router.get("/my", authenticate, async (req: AuthRequest, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Get single order by reference
router.get("/:reference", authenticate, async (req: AuthRequest, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { reference: req.params.reference },
      include: {
        items: {
          include: {
            productKey: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Only owner or admin can view
    if (order.userId !== req.user!.id && req.user!.role !== "ADMIN") {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json({ order });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router;
