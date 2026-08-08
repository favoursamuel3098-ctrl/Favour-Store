import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate, requireRole, AuthRequest } from "../middleware/auth";
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
    schema.parse(req.body);

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user!.id },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

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
          paymentProvider: "opay_manual",
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

      await tx.cartItem.deleteMany({
        where: { userId: req.user!.id },
      });

      return newOrder;
    });

    res.status(201).json({
      message: "Order created. Please make payment.",
      order: {
        id: order.id,
        reference: order.reference,
        total: order.total,
        currency: order.currency,
        status: order.status,
      },
      payment: {
        method: "opay_manual",
        accountNumber: "7075627260",
        accountName: "Favour Samuel Olakunle",
        amount: order.total,
        currency: "NGN",
        reference: order.reference,
        instructions: "Transfer the exact amount to the Opay account above. Use the Order Reference as narration if possible. Then click 'I have paid'.",
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

// Customer marks "I have paid"
router.post("/:reference/mark-paid", authenticate, async (req: AuthRequest, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { reference: req.params.reference },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.userId !== req.user!.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    if (order.status !== "PENDING") {
      return res.status(400).json({ error: "Order is not pending payment" });
    }

    // Keep status as PENDING but we can treat it as "awaiting confirmation"
    // Admin will later confirm and mark as PAID
    res.json({
      message: "Thank you! We have received your payment notification. Please wait for confirmation. You will get your product once payment is verified.",
      order: {
        reference: order.reference,
        status: order.status,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// Admin confirms payment and fulfills order
router.post(
  "/:reference/confirm-payment",
  authenticate,
  requireRole("ADMIN"),
  async (req: AuthRequest, res) => {
    try {
      const order = await prisma.order.findUnique({
        where: { reference: req.params.reference },
        include: { items: true },
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      if (order.status === "PAID" || order.status === "FULFILLED") {
        return res.json({ message: "Order already confirmed", order });
      }

      await prisma.$transaction(async (tx) => {
        await tx.order.update({
          where: { id: order.id },
          data: {
            status: "PAID",
            paidAt: new Date(),
          },
        });

        for (const item of order.items) {
          if (item.deliveryType === "LICENSE_KEY" && item.productId) {
            const availableKey = await tx.productKey.findFirst({
              where: { productId: item.productId, isUsed: false },
            });

            if (availableKey) {
              await tx.productKey.update({
                where: { id: availableKey.id },
                data: { isUsed: true, usedAt: new Date() },
              });
              await tx.orderItem.update({
                where: { id: item.id },
                data: { productKeyId: availableKey.id },
              });
            }
          }

          if (item.productId) {
            await tx.product.update({
              where: { id: item.productId },
              data: { salesCount: { increment: item.quantity } },
            });
          }
        }

        await tx.order.update({
          where: { id: order.id },
          data: {
            status: "FULFILLED",
            fulfilledAt: new Date(),
          },
        });
      });

      res.json({ message: "Payment confirmed and order fulfilled" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to confirm payment" });
    }
  }
);

// Get user's orders
router.get("/my", authenticate, async (req: AuthRequest, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: { items: true },
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
        items: { include: { productKey: true } },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.userId !== req.user!.id && req.user!.role !== "ADMIN") {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json({
      order,
      payment:
        order.status === "PENDING"
          ? {
              method: "opay_manual",
              accountNumber: "7075627260",
              accountName: "Favour Samuel Olakunle",
              amount: order.total,
              currency: "NGN",
              reference: order.reference,
            }
          : null,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

export default router;
