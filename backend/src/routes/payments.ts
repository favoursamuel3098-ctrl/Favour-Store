import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

/**
 * Opay Webhook / Callback
 * This endpoint will receive payment notifications from Opay.
 * You must configure this URL in your Opay Business Dashboard.
 *
 * Example: https://your-domain.com/api/payments/opay/webhook
 */
router.post("/opay/webhook", async (req, res) => {
  try {
    console.log("Opay Webhook received:", JSON.stringify(req.body, null, 2));

    const data = req.body?.data || req.body;
    const reference = data?.outOrderNo || data?.reference || data?.outOrderNo;
    const status = data?.status;

    if (!reference) {
      return res.status(400).json({ code: "00001", message: "Missing reference" });
    }

    const order = await prisma.order.findUnique({
      where: { reference },
      include: { items: true },
    });

    if (!order) {
      console.warn("Order not found for reference:", reference);
      return res.json({ code: "00000", message: "SUCCESSFUL" });
    }

    // Already processed
    if (order.status === "PAID" || order.status === "FULFILLED") {
      return res.json({ code: "00000", message: "SUCCESSFUL" });
    }

    if (status === "SUCCESS" || status === "SUCCESSFUL") {
      await prisma.$transaction(async (tx) => {
        await tx.order.update({
          where: { id: order.id },
          data: {
            status: "PAID",
            paidAt: new Date(),
            paymentReference: data.orderNo || data.payNo || null,
          },
        });

        // Assign license keys if needed
        for (const item of order.items) {
          if (item.deliveryType === "LICENSE_KEY" && item.productId) {
            const availableKey = await tx.productKey.findFirst({
              where: {
                productId: item.productId,
                isUsed: false,
              },
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

          // Increase sales count
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

      console.log(`Order ${reference} marked as PAID + FULFILLED`);
    }

    // Always respond success to Opay so they stop retrying
    res.json({ code: "00000", message: "SUCCESSFUL" });
  } catch (err) {
    console.error("Opay webhook error:", err);
    res.status(500).json({ code: "00002", message: "Internal error" });
  }
});

export default router;
