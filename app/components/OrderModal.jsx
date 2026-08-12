"use client";

import { useState } from "react";
import { Modal, Button } from "@heroui/react";
import { toast } from "sonner";
import { createOrder } from "@/lib/api";

/**
 * Order modal — quantity picker for placing an order on a product.
 *
 * Props:
 *  product      — Product object
 *  userId       — current user ID
 *  isOpen       — boolean
 *  onClose      — () => void
 *  onSuccess    — () => void  — optional callback after successful order
 */
export function OrderModal({ product, userId, isOpen, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!product) return null;

  const maxQty = product.stock ?? 1;
  const total = (Number(product.price) * quantity).toFixed(2);

  async function handleOrder() {
    if (!userId) {
      toast.error("Please select an active user first.");
      return;
    }
    if (quantity < 1 || quantity > maxQty) {
      toast.error(`Quantity must be between 1 and ${maxQty}.`);
      return;
    }
    setLoading(true);
    try {
      await createOrder({ userId, productId: product.id, quantity });
      toast.success(`Order placed for ${quantity}× "${product.title}"! 🎉`);
      onClose();
      onSuccess?.();
      setQuantity(1);
    } catch (err) {
      toast.error(err.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    if (!loading) {
      setQuantity(1);
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <Modal.Root isOpen={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Modal.Backdrop isDismissable={!loading}>
        <Modal.Container size="sm">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>Place Order</Modal.Heading>
              <Modal.CloseTrigger />
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-5 py-2">
              {/* Product summary */}
              <div
                className="rounded-xl p-4 border flex flex-col gap-1"
                style={{
                  background: "oklch(0.585 0.233 293.2 / 0.06)",
                  borderColor: "oklch(0.585 0.233 293.2 / 0.2)",
                }}
              >
                <p className="font-semibold text-sm" style={{ color: "oklch(0.94 0.005 286)" }}>
                  {product.title}
                </p>
                <p className="text-xs" style={{ color: "oklch(0.6 0.005 286)" }}>
                  {product.description || "No description"}
                </p>
                <p className="text-base font-bold mt-1" style={{ color: "oklch(0.72 0.18 293)" }}>
                  ${Number(product.price).toFixed(2)} per unit
                </p>
              </div>

              {/* Quantity picker */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="order-quantity"
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.75 0.005 286)" }}
                >
                  Quantity <span style={{ color: "oklch(0.55 0.005 286)" }}>({maxQty} available)</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    id="qty-decrease"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-lg transition-all disabled:opacity-30"
                    style={{
                      background: "oklch(0.25 0.006 286)",
                      borderColor: "oklch(0.32 0.006 286)",
                      color: "oklch(0.85 0.005 286)",
                    }}
                  >
                    −
                  </button>

                  <input
                    id="order-quantity"
                    type="number"
                    min={1}
                    max={maxQty}
                    value={quantity}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (!isNaN(v)) setQuantity(Math.min(maxQty, Math.max(1, v)));
                    }}
                    className="flex-1 h-10 text-center rounded-xl border text-sm font-semibold focus:outline-none focus:ring-2"
                    style={{
                      background: "oklch(0.25 0.006 286)",
                      borderColor: "oklch(0.32 0.006 286)",
                      color: "oklch(0.94 0.005 286)",
                      focusRingColor: "oklch(0.585 0.233 293.2)",
                    }}
                  />

                  <button
                    id="qty-increase"
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    disabled={quantity >= maxQty}
                    className="w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-lg transition-all disabled:opacity-30"
                    style={{
                      background: "oklch(0.25 0.006 286)",
                      borderColor: "oklch(0.32 0.006 286)",
                      color: "oklch(0.85 0.005 286)",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Order total */}
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl border"
                style={{
                  background: "oklch(0.585 0.233 293.2 / 0.08)",
                  borderColor: "oklch(0.585 0.233 293.2 / 0.2)",
                }}
              >
                <span className="text-sm font-medium" style={{ color: "oklch(0.7 0.005 286)" }}>
                  Order total
                </span>
                <span className="text-lg font-bold" style={{ color: "oklch(0.72 0.18 293)" }}>
                  ${total}
                </span>
              </div>
            </Modal.Body>

            <Modal.Footer className="gap-3">
              <Button
                id="cancel-order-btn"
                variant="ghost"
                onPress={handleClose}
                isDisabled={loading}
                style={{ borderRadius: "12px", color: "oklch(0.65 0.005 286)" }}
              >
                Cancel
              </Button>
              <Button
                id="confirm-order-btn"
                onPress={handleOrder}
                isLoading={loading}
                style={{
                  background: "linear-gradient(135deg, oklch(0.585 0.233 293.2), oklch(0.52 0.26 270))",
                  color: "white",
                  borderRadius: "12px",
                  fontWeight: 600,
                }}
              >
                {loading ? "Placing…" : "Confirm Order"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
}
